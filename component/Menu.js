import * as React from 'react';
import Menu, { menuClasses } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
const Menu = () =>
{
    const [ menuIndex, setMenuIndex ] = React.useState( null );
    const itemProps = {
        onClick: () => setMenuIndex( null ),
    };
    const createHandleLeaveMenu = ( index ) => ( getIsOnButton ) =>
    {
        setTimeout( () =>
        {
            const isOnButton = getIsOnButton();
            if ( !isOnButton )
            {
                setMenuIndex( ( latestIndex ) =>
                {
                    if ( index === latestIndex )
                    {
                        return null;
                    }
                    return latestIndex;
                } );
            }
        }, 200 );
    };

    return (
        
            <List>
                <ListItem>
                    <MenuButton
                        label="Apps"
                        open={ menuIndex === 0 }
                        onOpen={ () => setMenuIndex( 0 ) }
                        onLeaveMenu={ createHandleLeaveMenu( 0 ) }
                        menu={
                            <Menu onClose={ () => setMenuIndex( null ) }>
                                <MenuItem { ...itemProps } >Application 1</MenuItem>
                                <MenuItem { ...itemProps }>Application 2</MenuItem>
                                <MenuItem { ...itemProps }>Application 3</MenuItem>
                            </Menu>
                        }
                    >
                    </MenuButton>
                </ListItem>
                <ListItem>
                    <MenuButton
                        label="Settings"
                        open={ menuIndex === 1 }
                        onOpen={ () => setMenuIndex( 1 ) }
                        onLeaveMenu={ createHandleLeaveMenu( 1 ) }
                        menu={
                            <Menu onClose={ () => setMenuIndex( null ) }>
                                <MenuItem { ...itemProps }>Setting 1</MenuItem>
                                <MenuItem { ...itemProps }>Setting 2</MenuItem>
                                <MenuItem { ...itemProps }>Setting 3</MenuItem>
                            </Menu>
                        }
                    >
                        <Settings />
                    </MenuButton>
                </ListItem>
                <ListItem>
                    <MenuButton
                        label="Personal"
                        open={ menuIndex === 2 }
                        onOpen={ () => setMenuIndex( 2 ) }
                        onLeaveMenu={ createHandleLeaveMenu( 2 ) }
                        menu={
                            <Menu onClose={ () => setMenuIndex( null ) }>
                                <MenuItem { ...itemProps }>Personal 1</MenuItem>
                                <MenuItem { ...itemProps }>Personal 2</MenuItem>
                                <MenuItem { ...itemProps }>Personal 3</MenuItem>
                            </Menu>
                        }
                    >
                        <Person />
                    </MenuButton>
                </ListItem>
            </List>
       
    )
}
export default Menu;