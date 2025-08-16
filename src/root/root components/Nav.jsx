import React, { useContext } from 'react';
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Link, NavLink, useLocation } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BadgeCheckIcon, MenuIcon } from 'lucide-react';
import { DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, } from '../../components/ui/dropdown-menu';
import { ModeToggle } from '../../components/mode-toggle';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Badge } from "@/components/ui/badge"

const Nav = () => {
  const { user, logout, loading, role } = useContext(AuthContext)
  const location = useLocation()

  const handleLogout = function () {
    logout().then(() => {
      // Sign-out successful.
      // //console.log("logged out")
      toast.success("Logged Out Sucessful");


    }).catch((error) => {
      //
      // //console.log("An error happened.", error)
      toast.error(error);

    });

  }
  return (
    <div className='w-full shadow-md shadow-secondary bg-background'>
      <header className="w-11/12 mx-auto py-4 sm:px-4 flex justify-between items-center">
        {/* Dropdown Menu for smaller screens */}
        <div className='md:hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild><MenuIcon /></DropdownMenuTrigger>
            <DropdownMenuContent className="sm:hidden">
              <DropdownMenuItem>
                <NavLink to="/">Home</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink to="/about">About</NavLink>
              </DropdownMenuItem>
              {user && (<DropdownMenuSub>
                <div className='flex'><NavLink to="/dashboard"><DropdownMenuItem>Dashboard</DropdownMenuItem></NavLink>{location.pathname.startsWith('/dashboard') && <DropdownMenuSubTrigger></DropdownMenuSubTrigger>}</div>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className={"sm:hidden"}>
                    {
                      location.pathname.startsWith('/dashboard') && (
                        <>
                          {role === 'admin' && (
                            <>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/employees">All Employee List</NavLink>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/payroll">Payroll</NavLink>
                              </DropdownMenuItem>
                            </>
                          )}

                          {role === 'hr' && (
                            <>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/employee-list">Employee List</NavLink>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/work-progress">Work Progress</NavLink>
                              </DropdownMenuItem>
                            </>
                          )}

                          {role === 'employee' && (
                            <>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/worksheet">Work Sheet</NavLink>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <NavLink to="/dashboard/payment-history">Payment History</NavLink>
                              </DropdownMenuItem>
                            </>
                          )}
                        </>
                      )
                    }
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>)}

              <DropdownMenuItem>
                <NavLink to="/contact">Contact Us</NavLink>
              </DropdownMenuItem>

              <DropdownMenuItem></DropdownMenuItem>
              {!user && (
                <div className="custom-btn">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/login" >
                      <Button variant="primary">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="secondary">Register</Button>
                    </Link>
                  </DropdownMenuItem>
                </div>
              )
              }

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-xl font-bold"><Link to="/">WorkSphere</Link></div>
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            {user && (<>
              {role === 'admin' ?
                (
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white dark:bg-blue-600"
                  >
                    <BadgeCheckIcon />
                    Admin
                  </Badge>
                )
                :
                ((role === 'hr') ? (
                  <Badge
                    variant="secondary"
                    className="bg-amber-500 text-white dark:bg-amber-600"
                  >
                    <BadgeCheckIcon />
                    Hr
                  </Badge>
                ) :
                  (
                    <Badge
                      variant="secondary"
                      className="bg-green-500 text-white dark:bg-green-600"
                    >
                      <BadgeCheckIcon />
                      Employee
                    </Badge>
                  )
                )
              }
            </>)
            }
            <div className='gap-4 items-center hidden md:flex'>
              {user && <NavigationMenuItem><NavLink to="/dashboard">Dashboard</NavLink></NavigationMenuItem>}

              <NavigationMenuItem><NavLink to="/">Home</NavLink></NavigationMenuItem>
              <NavigationMenuItem><NavLink to="/about">About</NavLink></NavigationMenuItem>
              <NavigationMenuItem><NavLink to="/contact">Contact Us</NavLink></NavigationMenuItem>
            </div>

            <NavigationMenuItem><ModeToggle /></NavigationMenuItem>
            {user ?
              (<>

                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger>
                      <DropdownMenuTrigger asChild>
                        <Avatar className="border-3 border-primary rounded-full">
                          <AvatarImage src={user.photoURL}
                            alt="User Avatar"
                            className="object-cover" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.displayName}</p>
                    </TooltipContent>
                  </Tooltip>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button onClick={handleLogout} variant="destructive">Logout</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>) :
              (<>
                {location.pathname === '/login' ? (
                  <NavigationMenuItem><Link to="/register"><Button variant="">Register</Button></Link></NavigationMenuItem>
                ) : location.pathname === '/register' ? (
                  <NavigationMenuItem><Link to="/login"><Button variant="">Login</Button></Link></NavigationMenuItem>
                ) : (
                  <>
                    <NavigationMenuItem>
                      <Link to="/login"><Button variant="" className="custom-auth-btn">Login</Button></Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link to="/register"><Button variant="" className="custom-auth-btn">Register</Button></Link>
                    </NavigationMenuItem>
                  </>
                )}
              </>)
            }
          </NavigationMenuList>
        </NavigationMenu>
      </header>
    </div>
  );
};

export default Nav;