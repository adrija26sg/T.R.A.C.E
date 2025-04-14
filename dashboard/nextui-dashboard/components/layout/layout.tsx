import React from 'react';
import {useLockedBody} from '../hooks/useBodyLock';
import {NavbarWrapper} from '../navbar/navbar';
import {WrapperLayout} from './layout.styles';

interface Props {
   children: React.ReactNode;
}

export const Layout = ({children}: Props) => {
   const [sidebarOpen, setSidebarOpen] = React.useState(false);
   const [_, setLocked] = useLockedBody(false);
   const handleToggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setLocked(!sidebarOpen);
   };

   return (

         <WrapperLayout>
            
            <NavbarWrapper>{children}</NavbarWrapper>
         </WrapperLayout>
   );
};
