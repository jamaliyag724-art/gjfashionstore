import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart, Heart, User, Search, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'New Arrivals', href: '/shop?filter=new' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
const { cart, wishlist, user, logout } = useStore();

  const handleLogout = () => {
    logout();
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-elegant'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-display text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              GJ <span className="text-gold">Fashion</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <Link to="/shop">
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/track-order">
              <Button variant="ghost" size="icon" className="relative">
                <Package className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <AnimatePresence>
                  {wishlistCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose text-primary-foreground text-xs">
                        {wishlistCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gold text-primary-foreground text-xs">
                        {cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            {user?.isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <div className="flex flex-col gap-6 mt-8">
                  <Link to="/" className="font-display text-2xl font-bold">
                    GJ <span className="text-gold">Fashion</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors ${
                          location.pathname === item.href
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      to="/track-order"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-muted-foreground"
                    >
                      Track Order
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
