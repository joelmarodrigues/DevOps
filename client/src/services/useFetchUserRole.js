import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

const useFetchUserRole = (user) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const onUserDocChanged = (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const fetchedRole = data.role;
          /* console.log('Fetched role:', fetchedRole); */
          setRole(fetchedRole);
        }
      };

      const unsubscribe = onSnapshot(userDocRef, onUserDocChanged);

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return role;
};

export default useFetchUserRole;
