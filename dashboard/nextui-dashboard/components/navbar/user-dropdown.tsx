import {Dropdown} from '@nextui-org/react';
import React from 'react';
import {DarkModeSwitch} from './darkmodeswitch';

export const UserDropdown = () => {
   return (
      <Dropdown placement="bottom-right">
         <Dropdown.Menu 
            aria-label="User menu actions" 
            css={{ 
               p: 0, 
               '.nextui-dropdown-item': { 
                  p: '$0', 
               }
            }}
         >
            <Dropdown.Item 
               key="switch" 
               css={{ 
                  p: '$0', 
               }}
            >
               <DarkModeSwitch />
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
};