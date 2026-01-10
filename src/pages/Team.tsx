import { ArrowLeft, Github, Code, Cloud, TestTube, Lightbulb, Crown, Users, Heart, Waves, GitCommit, MapPin, Coffee, Target, Handshake, Search, Palette, Bot, Calendar, Bug, Eye, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

import aswdAvatar from '@/assets/team-aswd.png';
import plplllAvatar from '@/assets/team-plplll.png';
import kombainisAvatar from '@/assets/team-kombainis.png';

interface TeamMember {
  name: string;
  avatar?: string;
  avatarIcon?: React.ReactNode;
  role: string;
  title: string;
  contributions: { icon: React.ReactNode; label: string }[];
  bio: string[];
  startDate: string;
  color: string;
  borderColor: string;
  textColor: string;
  isCreator?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    name: "Aswd_LV",
    avatar: aswdAvatar,
    role: "Founder & Lead Developer",
    title: "The Architect",
    startDate: "January 27th, 2025",
    contributions: [
      { icon: <Code className="w-4 h-4" />, label: "Core codebase (95%)" },
      { icon: <Crown className="w-4 h-4" />, label: "Project founder" },
      { icon: <Lightbulb className="w-4 h-4" />, label: "Vision and direction" },
      { icon: <Cloud className="w-4 h-4" />, label: "Cloud infrastructure" },
    ],
    bio: [
      "I started Urbanshade on January 27th, 2025. What began as a random idea quickly turned into something I genuinely care about. I have written around 95% of the code, designed how most of the systems work together, and spent more late nights than I can count making sure everything runs properly.",
      "From the authentication system to the admin panel, cloud sync to the moderation tools - I have had a hand in building most of it. There have been plenty of frustrating moments where things just would not work, but figuring those out is part of what makes this fun.",
      "I should be upfront about something: yes, AI tools have been involved in parts of development. But we use them as tools to help us build faster, not as a replacement for our own ideas and decisions. The weird features, the unusual design choices, the decision to make this project way more detailed than it needs to be - that is all us. I am genuinely excited about where this is headed."
    ],
    color: "from-yellow-500/30 to-amber-600/30",
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-400",
    isCreator: true,
  },
  {
    name: "plplll",
    avatar: plplllAvatar,
    role: "Developer & Tester",
    title: "The Collaborator",
    startDate: "Early 2025",
    contributions: [
      { icon: <Cloud className="w-4 h-4" />, label: "Cloud features" },
      { icon: <Code className="w-4 h-4" />, label: "Code contributions" },
      { icon: <TestTube className="w-4 h-4" />, label: "Feature testing" },
      { icon: <Lightbulb className="w-4 h-4" />, label: "Ideas and feedback" },
    ],
    bio: [
      "I joined in early 2025 when things were already getting interesting. Could not resist being part of my friend's project, especially once I saw where it was going. I have contributed to the cloud features, written some code here and there, and spent a lot of time testing things that probably should not work but somehow do.",
      "My main contribution is ideas and feedback. Sometimes when you are deep in a project you need someone with fresh eyes to point out what is working and what is not - that is where I come in. Plus, I get to break things on purpose and call it testing, which is a pretty good arrangement if you ask me.",
      "On the AI thing: yes, some tools have helped with development, but the humans are the ones making decisions and having fun with it. I mean, why does a passion project need a full cloud system? Ask Aswd, I just help build it."
    ],
    color: "from-slate-500/20 to-zinc-500/20",
    borderColor: "border-slate-500/30",
    textColor: "text-slate-400",
  },
  {
    name: "robo-karlix",
    avatarIcon: <Bot className="w-16 h-16 text-purple-400" />,
    role: "Lead Tester & Ideas",
    title: "The Strategist",
    startDate: "2025",
    contributions: [
      { icon: <TestTube className="w-4 h-4" />, label: "Extensive testing" },
      { icon: <Eye className="w-4 h-4" />, label: "Tech-savvy perspective" },
      { icon: <Lightbulb className="w-4 h-4" />, label: "Feature ideas" },
      { icon: <Bug className="w-4 h-4" />, label: "Edge case hunting" },
    ],
    bio: [
      "I handle the more thorough side of testing. While others might click around and see if things work, I try to think about how features should behave from a more technical standpoint. What happens if you do this and then that? What if someone tries something unexpected?",
      "Beyond testing, I contribute a lot of ideas for new features and improvements. Having used plenty of software and knowing what works well elsewhere, I try to bring that perspective to Urbanshade. Sometimes the best features come from asking simple questions about how things could be better.",
      "I look at things from a more tech-savvy angle, which helps catch issues that casual testing might miss and suggests features that more advanced users would appreciate."
    ],
    color: "from-purple-500/20 to-violet-500/20",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
  },
  {
    name: "Kombainis_yehaw",
    avatar: kombainisAvatar,
    role: "QA Tester",
    title: "The Farmer",
    startDate: "2025",
    contributions: [
      { icon: <TestTube className="w-4 h-4" />, label: "Quality assurance" },
      { icon: <Bug className="w-4 h-4" />, label: "Bug hunting" },
      { icon: <Users className="w-4 h-4" />, label: "User perspective" },
    ],
    bio: [
      "I am the designated bug finder around here. My job is straightforward: use things the way a regular person would, find what breaks, and report back. I click buttons in weird orders and try features without reading instructions first, because that is what actual users do.",
      "Quality assurance sounds fancy, but really I am just here to make sure you do not run into the same problems I stumble upon. My approach is less technical and more practical - if something feels confusing or does not work the way you would expect, I notice it.",
      "Also, I like The Simpsons. No particular reason, just felt like mentioning it."
    ],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    textColor: "text-green-500",
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold text-primary">URBANSHADE Team</h1>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/Urbanshade-Team" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to App
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="relative inline-block">
            <Users className="w-20 h-20 mx-auto text-primary animate-pulse" />
            <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full -z-10" />
          </div>
          
          <h2 className="text-5xl font-bold">
            Meet the <span className="text-primary">URBANSHADE</span> Team
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A small group of developers, testers, and contributors who decided to build 
            a surprisingly detailed fake operating system. We have no regrets.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Made in Latvia
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
              <Coffee className="w-3 h-3" />
              Fueled by Coffee
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
              <Target className="w-3 h-3" />
              100% Passion Project
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
              <Handshake className="w-3 h-3" />
              Open to Contributors
            </span>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="p-8 rounded-xl bg-gradient-to-br from-primary/20 via-blue-500/10 to-purple-500/20 border-2 border-primary/40 shadow-xl">
          <h3 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
            <Waves className="w-8 h-8" />
            The Story Behind Urbanshade OS
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              It started on <strong className="text-primary">January 27th, 2025</strong>, with a simple thought: 
              what if someone made a fully functional fake operating system, just for the sake of it? Instead of 
              dismissing the idea and going to sleep, the building actually began.
            </p>
            <p>
              What started as a weird side project turned into something much bigger. Friends joined in, ideas 
              kept flowing, and before long there were authentication systems, admin panels, cloud sync, and 
              far more features than any joke project should reasonably have. A messaging system. A moderation 
              panel. A full developer console. Why? Because it was fun to build.
            </p>
            <p>
              We will be honest about something: AI tools have been involved in parts of development. But here is 
              how we see it - we use AI as a tool, not a replacement for creativity. The unusual ideas, the odd 
              feature choices, the decision to add things like a fake ban prank - that is all human decision-making. 
              We are having fun, and we think that shows in the result.
            </p>
            <p className="text-lg font-medium text-primary">
              Urbanshade OS is proof that passion projects do not need a practical purpose. Sometimes the journey 
              is the destination.
            </p>
          </div>
        </section>

        {/* Avatar Disclaimer */}
        <section className="text-center p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <p className="text-amber-400 text-lg font-medium">
            Since we prefer not to show our faces, we use our Roblox avatars instead
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Privacy first. Besides, our avatars are honestly cooler than we are in real life.
          </p>
        </section>

        {/* Team Grid */}
        <section className="space-y-8">
          <h3 className="text-2xl font-bold text-center">The Crew</h3>
          <p className="text-center text-muted-foreground max-w-xl mx-auto">
            The people behind this unusually detailed operating system project.
          </p>
          
          <div className="space-y-8">
            {teamMembers.map((member) => (
              <div 
                key={member.name}
                className={`p-8 rounded-xl bg-gradient-to-br ${member.color} border-2 ${member.borderColor} transition-all group relative ${member.isCreator ? 'ring-2 ring-yellow-500/50 shadow-lg shadow-yellow-500/20' : ''}`}
              >
                {/* Creator highlight badge */}
                {member.isCreator && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-500 text-black text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Crown className="w-4 h-4" />
                    THE CREATOR
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar & Quick Info */}
                  <div className="flex flex-col items-center md:items-start md:w-48 shrink-0">
                    <div className={`w-32 h-32 mb-4 rounded-xl overflow-hidden border-2 shadow-lg bg-black/40 flex items-center justify-center ${member.isCreator ? 'border-yellow-500 ring-2 ring-yellow-500/30' : 'border-white/20'}`}>
                      {member.avatar ? (
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        member.avatarIcon
                      )}
                    </div>
                    <h4 className={`text-xl font-bold ${member.textColor} text-center md:text-left flex items-center gap-2`}>
                      {member.name}
                      {member.isCreator && <Crown className="w-5 h-5 text-yellow-400" />}
                    </h4>
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs mt-2 ${member.isCreator ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' : 'bg-black/40 border-white/10 text-muted-foreground'}`}>
                      {member.role}
                    </span>
                    <p className="text-sm text-muted-foreground italic mt-2">"{member.title}"</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Since {member.startDate}
                    </p>
                    
                    {/* Contributions */}
                    <div className="space-y-2 mt-4 w-full">
                      {member.contributions.map((contrib, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 text-muted-foreground ${member.isCreator ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-black/30'}`}
                        >
                          <span className={member.textColor}>{contrib.icon}</span>
                          <span>{contrib.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="flex-1 space-y-4">
                    {member.isCreator && (
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mb-4">
                        <p className="text-sm text-yellow-400 font-medium flex items-center gap-2">
                          <Crown className="w-4 h-4" />
                          The person who asked "what if we made a fake OS" and then actually went and did it. Started this project, still running it.
                        </p>
                      </div>
                    )}
                    {member.bio.map((paragraph, idx) => (
                      <p key={idx} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-center">What We Believe In</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-primary mb-2">Transparency</h4>
              <p className="text-sm text-muted-foreground">
                We are upfront about how things are built and what goes into the project. Open source, open communication.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-primary mb-2">Creativity</h4>
              <p className="text-sm text-muted-foreground">
                Why make something ordinary when you can build a fully simulated underwater facility OS? Go big or go home.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-black/40 border border-white/10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-primary mb-2">Community</h4>
              <p className="text-sm text-muted-foreground">
                Built by contributors, shaped by feedback. What users say matters and influences what gets built next.
              </p>
            </div>
          </div>
        </section>

        {/* All Contributors Link */}
        <section className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-center">
          <GitCommit className="w-10 h-10 mx-auto text-purple-400 mb-3" />
          <h3 className="text-xl font-bold mb-2">See All Contributors</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-4">
            Everyone who has contributed to Urbanshade, whether through code, ideas, testing, or feedback.
          </p>
          <Link 
            to="/team/git"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors font-medium"
          >
            <Users className="w-5 h-5" />
            View All Contributors
          </Link>
        </section>

        {/* Join Section */}
        <section className="p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 text-center">
          <Heart className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold mb-3">Want to Join the Team?</h3>
          <p className="text-muted-foreground max-w-lg mx-auto mb-6">
            We are always open to new contributors. Whether you want to help with code, testing, 
            ideas, documentation, or just want to be part of the project - we would be glad to have you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://github.com/Urbanshade-Team" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              Check out our GitHub
            </a>
            <Link 
              to="/docs"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-colors font-medium"
            >
              <Code className="w-5 h-5" />
              Read the Docs
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-white/10 space-y-4">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            URBANSHADE Team <span className="text-muted-foreground/50">•</span> Made with <Heart className="w-4 h-4 text-red-500" /> in Latvia <span className="text-muted-foreground/50">•</span> 2025
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">Docs</Link>
            <Link to="/status" className="text-muted-foreground hover:text-primary transition-colors">Status</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Team;
