import { useState, useCallback, useEffect } from 'react';

export interface Contact {
  userId: string;
  username: string;
  displayName: string | null;
  addedAt: string;
  nickname?: string;
}

const CONTACTS_KEY = 'urbanshade_contacts';

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CONTACTS_KEY);
    if (saved) {
      try {
        setContacts(JSON.parse(saved));
      } catch {
        setContacts([]);
      }
    }
  }, []);

  // Save contacts to localStorage
  const saveContacts = useCallback((newContacts: Contact[]) => {
    setContacts(newContacts);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
  }, []);

  const addContact = useCallback((userId: string, username: string, displayName: string | null, nickname?: string) => {
    setContacts(prev => {
      if (prev.some(c => c.userId === userId)) {
        return prev; // Already exists
      }
      const newContacts = [...prev, {
        userId,
        username,
        displayName,
        addedAt: new Date().toISOString(),
        nickname
      }];
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
      return newContacts;
    });
  }, []);

  const removeContact = useCallback((userId: string) => {
    setContacts(prev => {
      const newContacts = prev.filter(c => c.userId !== userId);
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
      return newContacts;
    });
  }, []);

  const isContact = useCallback((userId: string) => {
    return contacts.some(c => c.userId === userId);
  }, [contacts]);

  const setNickname = useCallback((userId: string, nickname: string) => {
    setContacts(prev => {
      const newContacts = prev.map(c => 
        c.userId === userId ? { ...c, nickname } : c
      );
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
      return newContacts;
    });
  }, []);

  const getContact = useCallback((userId: string) => {
    return contacts.find(c => c.userId === userId);
  }, [contacts]);

  const exportContacts = useCallback(() => {
    const dataStr = JSON.stringify(contacts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'urbanshade_contacts.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [contacts]);

  const importContacts = useCallback((jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString) as Contact[];
      if (!Array.isArray(imported)) throw new Error('Invalid format');
      
      // Merge with existing, avoiding duplicates
      setContacts(prev => {
        const existingIds = new Set(prev.map(c => c.userId));
        const newContacts = [...prev, ...imported.filter(c => !existingIds.has(c.userId))];
        localStorage.setItem(CONTACTS_KEY, JSON.stringify(newContacts));
        return newContacts;
      });
      return { success: true, count: imported.length };
    } catch {
      return { success: false, error: 'Invalid JSON format' };
    }
  }, []);

  return {
    contacts,
    addContact,
    removeContact,
    isContact,
    setNickname,
    getContact,
    exportContacts,
    importContacts,
    saveContacts
  };
};
