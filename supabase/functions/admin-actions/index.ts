import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check if user is admin
    const { data: roleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      console.log(`Access denied for user ${user.id} - not an admin`);
      return new Response(JSON.stringify({ error: 'Access denied - admin only' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Admin ${user.id} accessing admin actions`);

    const url = new URL(req.url);
    const action = url.pathname.split('/').pop();

    // Handle different actions
    if (req.method === 'GET') {
      if (action === 'users' || url.pathname.endsWith('/admin-actions')) {
        // Get all users with their profiles and moderation status
        const { data: profiles, error } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Get moderation actions for each user
        const { data: moderationActions } = await supabaseAdmin
          .from('moderation_actions')
          .select('*')
          .eq('is_active', true);

        // Get user roles
        const { data: roles } = await supabaseAdmin
          .from('user_roles')
          .select('*');

        const usersWithStatus = profiles?.map(p => {
          const userActions = moderationActions?.filter(a => a.target_user_id === p.user_id) || [];
          const userRole = roles?.find(r => r.user_id === p.user_id);
          const activeBan = userActions.find(a => 
            (a.action_type === 'temp_ban' || a.action_type === 'perm_ban') && 
            (!a.expires_at || new Date(a.expires_at) > new Date())
          );
          const warnings = userActions.filter(a => a.action_type === 'warn');

          return {
            ...p,
            role: userRole?.role || 'user',
            isBanned: !!activeBan,
            banInfo: activeBan,
            warningsCount: warnings.length,
            warnings
          };
        });

        return new Response(JSON.stringify({ users: usersWithStatus }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'logs') {
        // Get moderation logs
        const { data: logs, error } = await supabaseAdmin
          .from('moderation_actions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        return new Response(JSON.stringify({ logs }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    if (req.method === 'POST') {
      const body = await req.json();
      
      if (action === 'warn') {
        const { targetUserId, reason } = body;
        
        const { data, error } = await supabaseAdmin
          .from('moderation_actions')
          .insert({
            target_user_id: targetUserId,
            action_type: 'warn',
            reason,
            created_by: user.id,
            is_active: true
          })
          .select()
          .single();

        if (error) throw error;
        console.log(`Admin ${user.id} warned user ${targetUserId}: ${reason}`);

        return new Response(JSON.stringify({ success: true, action: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'ban') {
        const { targetUserId, reason, duration, isPermanent, isFake } = body;
        
        let expiresAt = null;
        if (!isPermanent && duration) {
          const now = new Date();
          if (duration === '1h') expiresAt = new Date(now.getTime() + 60 * 60 * 1000);
          else if (duration === '24h') expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          else if (duration === '7d') expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          else if (duration === '30d') expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        }

        const { data, error } = await supabaseAdmin
          .from('moderation_actions')
          .insert({
            target_user_id: targetUserId,
            action_type: isPermanent ? 'perm_ban' : 'temp_ban',
            reason,
            expires_at: expiresAt?.toISOString() || null,
            created_by: user.id,
            is_active: true,
            is_fake: isFake || false
          })
          .select()
          .single();

        if (error) throw error;
        console.log(`Admin ${user.id} ${isFake ? 'fake ' : ''}banned user ${targetUserId}: ${reason} (${isPermanent ? 'permanent' : duration})`);

        return new Response(JSON.stringify({ success: true, action: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'unban') {
        const { targetUserId } = body;
        
        const { error } = await supabaseAdmin
          .from('moderation_actions')
          .update({ is_active: false })
          .eq('target_user_id', targetUserId)
          .in('action_type', ['temp_ban', 'perm_ban']);

        if (error) throw error;
        console.log(`Admin ${user.id} unbanned user ${targetUserId}`);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (action === 'ip-ban') {
        const { targetIp, reason } = body;
        
        const { data, error } = await supabaseAdmin
          .from('moderation_actions')
          .insert({
            target_ip: targetIp,
            action_type: 'ip_ban',
            reason,
            created_by: user.id,
            is_active: true
          })
          .select()
          .single();

        if (error) throw error;
        console.log(`Admin ${user.id} IP banned ${targetIp}: ${reason}`);

        return new Response(JSON.stringify({ success: true, action: data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    console.error('Admin action error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
