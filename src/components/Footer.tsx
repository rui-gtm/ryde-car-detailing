import logo from "@/assets/ryde-logo-Bh-MidXe.jpg";

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full">
              <img
                src={logo}
                alt="Ryde Car Detailing logo"
                className="absolute inset-0 h-full w-full object-cover origin-center scale-[2]"
                loading="lazy"
              />
            </div>
            <span className="font-semibold text-foreground">Ryde Car Detailing</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ryde Car Detailing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
