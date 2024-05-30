import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@shared/providers/redux';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    React.useEffect(() => {
        if (!user) {
            router.replace(('(auth)'));
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return <>{children}</>;
};

export default AuthWrapper;
