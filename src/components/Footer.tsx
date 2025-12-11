const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">RYDE</span>
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
