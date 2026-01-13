
import React, { useState, useEffect } from 'react';

// --- Components ---

const ProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full h-1 z-[100] bg-dark">
      <div 
        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150" 
        style={{ width: `${scroll}%` }} 
      />
    </div>
  );
};

const Navigation = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Internships', href: '#internships' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-primary/20 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Unified Logo Container: Includes both GIF and Text inside a black bar in light mode */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark dark:bg-transparent rounded-none transition-colors duration-300">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://nayanchauhan2015.github.io/my3dportfolio/assets/logos-1af25a03.gif" 
                  className="w-full h-full object-contain" 
                  alt="Logo" 
                />
              </div>
              <div className="text-2xl font-bold text-white dark:text-white leading-none">
                <span className="text-primary">NAYAN</span>
              </div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-6">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors text-[10px] uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary/10 transition-all dark:text-primary text-dark"
            >
              <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
            </button>
            <SocialIcon icon="ri-linkedin-fill" href="https://www.linkedin.com/in/nayan-chauhan-50334230b" />
            <SocialIcon icon="ri-github-fill" href="https://github.com/Nayan9687" />
          </div>

          <div className="flex lg:hidden items-center space-x-3">
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary"
            >
              <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'}></i>
            </button>
            <button className="text-primary" onClick={() => setIsOpen(true)}>
              <i className="ri-menu-3-line text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 bg-white dark:bg-dark z-[60] transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-6 flex flex-col h-full">
          <button className="self-end text-primary mb-8" onClick={() => setIsOpen(false)}>
            <i className="ri-close-line text-3xl"></i>
          </button>
          <nav className="flex flex-col space-y-6 text-xl font-medium items-center">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-dark dark:text-white hover:text-primary"
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

const SocialIcon = ({ icon, href }: { icon: string, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors text-xl">
    <i className={icon}></i>
  </a>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-dark mb-4 uppercase tracking-wider">{title}</h2>
    <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
    {subtitle && <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const SkillBar = ({ label, percentage }: { label: string, percentage: string }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-primary">{percentage}</span>
    </div>
    <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full bg-primary" style={{ width: percentage }}></div>
    </div>
  </div>
);

const CategoryCard = ({ title, subtitle, images, onOpen }: { title: string, subtitle: string, images: any[], onOpen: (imgs: any[], catTitle: string) => void }) => (
  <div 
    className="bg-white dark:bg-white rounded-2xl overflow-hidden cursor-pointer group hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-transparent"
    onClick={() => onOpen(images, title)}
  >
    <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-100 relative overflow-hidden flex items-center justify-center p-4">
      <img 
        src={images[0]?.src} 
        alt={title} 
        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-dark/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="bg-primary text-dark font-bold px-4 py-2 rounded-full text-xs uppercase tracking-tighter shadow-xl">Explore</span>
      </div>
    </div>
    <div className="p-5 bg-white">
      <h3 className="text-dark font-bold text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-xs">{subtitle}</p>
    </div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<{title: string, images: any[]}>({title: '', images: []});

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  const logos = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/1.png", title: "Tech Branding" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/12.png", title: "Modern Design" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/4.png", title: "Identity Design" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/5.png", title: "Creative Concept" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/6.png", title: "Minimal Logo" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/7.png", title: "Corporate Logo" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/8.png", title: "Luxury Brand" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/10.png", title: "E-commerce Logo" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/LOGO/11.png", title: "Agency Branding" },
  ];

  const socialMedia = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/17.png", title: "Fashion Collection" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/15.png", title: "Campaign Ad" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/18.png", title: "Instagram Post" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/7.png", title: "Product Promo" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/5.png", title: "Brand Story" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/2.png", title: "Food Social" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/1.png", title: "Restaurant Ad" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/10.png", title: "Event Post" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/POST/12.png", title: "Sale Banner" },
  ];

  const uiux = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/UIUX/post%20size%20.png", title: "App Layout" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/UIUX/ui1.png", title: "Mobile UI Design" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/UIUX/f1.png", title: "Figma Prototype" },
  ];

  const webDesign = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/sici.png", title: "Sici Tech Landing" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/eduzone.png", title: "Eduzone Web" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/first_portfolio.png", title: "Personal Portfolio" },
  ];

  const packaging = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/1.png", title: "Suketu Foods Box" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/2.png", title: "Spices Bag" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/3.png", title: "Bottle Label" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/4.png", title: "Product Mockup" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/PRODUCTS/5.png", title: "Full Collection" },
  ];

  const cardsMockups = [
    { src: "https://ik.imagekit.io/4awlyo9bf/images/CARDS/1.png", title: "Gold Logistics Card" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/MOCKUPS/LL1%20(7).png", title: "T-Shirt Branding" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/CARDS/2.png", title: "Professional Identity" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/MOCKUPS/LL1%20(8).png", title: "Mockup Design" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/CARDS/3.png", title: "Premium Card" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/CARDS/4.png", title: "Corporate Card" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/MOCKUPS/LL1%20(10).png", title: "Logo Mockup" },
    { src: "https://ik.imagekit.io/4awlyo9bf/images/CARDS/7.png", title: "Creative Business Card" },
  ];

  const handleOpenCategory = (images: any[], title: string) => {
    setActiveCategory({title, images});
    setModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-dark min-h-screen transition-colors duration-300">
      <ProgressBar />
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-20 flex items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              {/* Added pt-8 for mobile via responsive class */}
              <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-dark mb-2 tracking-tighter pt-8 md:pt-0">
                <span className="gradient-text">NAYAN</span><br />
                CHAUHAN
              </h1>
              <div className="h-1 w-32 bg-primary mb-6 mx-auto lg:mx-0"></div>
              <h2 className="text-2xl font-medium text-primary mb-8 tracking-widest uppercase">Front-end Developer & Designer</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                A highly skilled developer and designer focused on modern UI/UX and high-quality web solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="#projects" className="bg-primary text-dark font-bold px-8 py-3 rounded-button hover:bg-accent transition-all shadow-lg">VIEW PROJECTS</a>
                <a href="#contact" className="border border-primary text-primary font-bold px-8 py-3 rounded-button hover:bg-primary/10 transition-all">HIRE ME</a>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md perspective mb-12">
                <div className="card-3d bg-gray-50 dark:bg-secondary border border-primary/20 p-1 rounded-2xl shadow-2xl">
                  <div className="bg-white dark:bg-dark p-8 rounded-2xl">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                        <i className="ri-medal-fill text-5xl text-primary"></i>
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white text-dark text-center mb-6">Snapshot</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-100 dark:bg-secondary/50 p-3 rounded-lg border border-primary/10">
                        <p className="text-primary font-bold uppercase text-[10px]">Exp.</p>
                        <p className="dark:text-white text-dark">2+ Years</p>
                      </div>
                      <div className="bg-gray-100 dark:bg-secondary/50 p-3 rounded-lg border border-primary/10">
                        <p className="text-primary font-bold uppercase text-[10px]">Projects</p>
                        <p className="dark:text-white text-dark">10+ Done</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. About Me */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-secondary scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-dark p-2 rounded-2xl border border-primary/30 overflow-hidden shadow-2xl mb-8">
                <img src="https://ik.imagekit.io/4awlyo9bf/images/my_photo_Last.png" className="w-full h-auto rounded-xl" alt="Nayan Chauhan" />
              </div>
              <div className="space-y-4">
                <ContactInfoItem icon="ri-calendar-event-line" label="Date of Birth" value="22 April 2000" />
                <ContactInfoItem icon="ri-map-pin-line" label="Location" value="Nadiad, Gujarat" />
                <ContactInfoItem icon="ri-global-line" label="Website" value="nayanchauhan.com" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-4xl font-bold dark:text-white text-dark mb-6 uppercase">About My Journey</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
                I am a dedicated Frontend Developer and Graphic Designer with a background in Information Technology. My goal is to build visually compelling and user-centric digital products.
              </p>
              <div className="grid md:grid-cols-2 gap-x-12 mb-10">
                <SkillBar label="UI/UX Design" percentage="90%" />
                <SkillBar label="Web Development" percentage="85%" />
                <SkillBar label="Branding" percentage="92%" />
                <SkillBar label="CMS Solutions" percentage="80%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expertise */}
      <section id="expertise" className="py-24 bg-white dark:bg-dark scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Core Expertise" subtitle="The specialized technical stack and creative tools I master." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: 'ri-reactjs-line', name: 'React / Next' },
              { icon: 'ri-html5-line', name: 'HTML5 / CSS3' },
              { icon: 'ri-wordpress-line', name: 'WordPress' },
              { icon: 'ri-pen-nib-line', name: 'Figma' },
              { icon: 'ri-shopping-bag-3-line', name: 'Shopify' },
              { icon: 'ri-palette-line', name: 'UI Design' }
            ].map(skill => (
              <div key={skill.name} className="bg-gray-50 dark:bg-secondary p-6 rounded-2xl border border-primary/10 text-center hover:border-primary/50 transition-all">
                <i className={`${skill.icon} text-4xl text-primary mb-4 block`}></i>
                <span className="text-sm font-bold dark:text-white text-dark uppercase tracking-tighter">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Education */}
      <section id="education" className="py-24 bg-gray-50 dark:bg-secondary scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Education" />
          <div className="max-w-4xl mx-auto space-y-12 border-l-2 border-primary/20 pl-10">
            <EduEntry title="B.E. Information Technology" school="Sardar Patel College of Engineering" date="2018 - 2022" result="CGPA: 7.23" />
            <EduEntry title="HSC (12th)" school="National Institute of Open Schooling" date="March 2017" result="Score: 61.00%" />
            <EduEntry title="SSC (10th)" school="St. Anne's High School (GSEB)" date="March 2015" result="Score: 56.00%" />
          </div>
        </div>
      </section>

      {/* 4. Internship */}
      <section id="internships" className="py-24 bg-white dark:bg-dark scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Internship History" subtitle="Practical learning experiences that shaped my professional skills." />
          <div className="max-w-4xl mx-auto space-y-8">
            <InternshipItem 
              title="Java Full Stack Developer" 
              company="TATA Strive | Anand" 
              date="2023" 
              desc="Comprehensive training in Java, Spring Boot, and modern web integration. Built end-to-end applications and collaborated in a corporate environment."
            />
            <InternshipItem 
              title="Front-end Developer" 
              company="Kathan Technologies | Nadiad" 
              date="2022" 
              desc="Focused on building responsive user interfaces. Worked on multiple client projects using HTML, CSS, and JavaScript with a focus on pixel-perfect designs."
            />
            <InternshipItem 
              title="Front-end Developer" 
              company="Ample Infotech | Nadiad" 
              date="2022" 
              desc="Assisted in developing dynamic web pages and refining UI/UX for local business websites. Gained early experience in collaborative development workflows."
            />
          </div>
        </div>
      </section>

      {/* 5. Experience */}
      <section id="experience" className="py-24 bg-gray-50 dark:bg-secondary scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Work Experience" />
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ExperienceCard 
              role="Graphic Designer & Shopify Expert" 
              company="Kuhluh Clothing Brand" 
              date="2024 - 2025" 
              points={["Store management & optimization", "Visual identity & collection design", "Social media campaign graphics"]}
            />
            <ExperienceCard 
              role="WordPress Developer" 
              company="E6Websolutions" 
              date="2023 - 2024" 
              points={["Custom theme development", "Client site maintenance", "Design system implementation"]}
            />
          </div>
        </div>
      </section>

      {/* 6. Project */}
      <section id="projects" className="py-24 bg-white dark:bg-dark scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Featured Projects" />
          <div className="grid md:grid-cols-3 gap-8">
            <ProjectCard title="Sici Technologies" desc="IT solutions website." img="https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/sici.png" tags={['WP']} link="https://sicitechnologies.com/" />
            <ProjectCard title="Eduzone Portal" desc="Learning platform frontend." img="https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/eduzone.png" tags={['Bootstrap']} link="https://nayanchauhan2015.github.io/Eduzone_frontend/" />
            <ProjectCard title="3D Interactive" desc="Three.js portfolio space." img="https://ik.imagekit.io/4awlyo9bf/images/WEBSITE/first_portfolio.png" tags={['ThreeJS']} link="https://nayanchauhan2015.github.io/my3dportfolio/" />
          </div>
        </div>
      </section>

      {/* 7. Gallery */}
      <section id="gallery" className="py-24 bg-gray-50 dark:bg-secondary scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Design Gallery" subtitle="A categorized collection of my creative works." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard title="Logo Design" subtitle="Branding and identities" images={logos} onOpen={handleOpenCategory} />
            <CategoryCard title="Social Media" subtitle="Marketing and ad campaigns" images={socialMedia} onOpen={handleOpenCategory} />
            <CategoryCard title="UI/UX Design" subtitle="Interfaces and prototypes" images={uiux} onOpen={handleOpenCategory} />
            <CategoryCard title="Web Design" subtitle="Live websites and layouts" images={webDesign} onOpen={handleOpenCategory} />
            <CategoryCard title="Packaging" subtitle="Label and product design" images={packaging} onOpen={handleOpenCategory} />
            <CategoryCard title="Cards & Mockups" subtitle="Corporate stationery and apparel" images={cardsMockups} onOpen={handleOpenCategory} />
          </div>
        </div>
      </section>

      {/* 8. Get in touch (Connect) */}
      <section id="contact" className="py-24 bg-white dark:bg-dark scroll-mt-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <SectionTitle title="Let's Connect" subtitle="Reach out for collaborations or project inquiries." />
          <div className="max-w-5xl mx-auto bg-gray-50 dark:bg-secondary p-6 md:p-12 rounded-3xl border border-primary/10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Info Column */}
              <div className="space-y-8 flex flex-col justify-center">
                <h3 className="text-3xl font-bold dark:text-white text-dark uppercase tracking-widest text-center lg:text-left">Contact Info</h3>
                <div className="space-y-6">
                  <ContactInfoItem icon="ri-mail-line" label="Email" value="nayanchauhan11111@gmail.com" />
                  <ContactInfoItem icon="ri-phone-line" label="Phone" value="8200701016" />
                  <ContactInfoItem icon="ri-map-pin-line" label="Location" value="Nadiad, Gujarat" />
                </div>
                <div className="flex justify-center lg:justify-start gap-6 mt-4">
                  <SocialIcon icon="ri-linkedin-box-fill" href="https://www.linkedin.com/in/nayan-chauhan-50334230b" />
                  <SocialIcon icon="ri-github-fill" href="https://github.com/Nayan9687" />
                  <SocialIcon icon="ri-instagram-line" href="https://www.instagram.com/rudrachauhan_007/" />
                </div>
              </div>
              
              {/* Form Column */}
              <form className="space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Name" placeholder="Your Name" />
                  <InputField label="Subject" placeholder="Hiring/Project" />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-500 text-xs font-bold uppercase tracking-widest">Message</label>
                  <textarea rows={4} className="w-full bg-white dark:bg-dark border border-primary/10 rounded-xl p-4 focus:border-primary outline-none dark:text-white text-dark transition-all text-sm"></textarea>
                </div>
                <button className="w-full bg-primary text-dark font-bold py-4 rounded-xl hover:bg-accent transition-all uppercase tracking-widest shadow-xl active:scale-95">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && activeCategory.images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-white/98 dark:bg-dark/98 backdrop-blur-xl flex flex-col p-6 overflow-y-auto">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-12 sticky top-0 bg-white/95 dark:bg-dark/95 p-4 rounded-b-2xl z-10 border-b border-primary/10">
              <div>
                <h2 className="text-3xl font-bold text-primary uppercase tracking-widest">{activeCategory.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{activeCategory.images.length} Projects</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-dark transition-all">
                <i className="ri-close-line text-3xl"></i>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
              {activeCategory.images.map((img, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-secondary/40 border border-primary/10 rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
                  <div className="w-full aspect-square bg-white dark:bg-dark/50 rounded-xl overflow-hidden flex items-center justify-center mb-4">
                    <img src={img.src} className="max-w-full max-h-full object-contain p-2" alt={img.title} />
                  </div>
                  <h4 className="dark:text-white text-dark font-medium text-center text-sm">{img.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-dark border-t border-primary/10 text-center transition-colors duration-300">
        <div className="text-2xl font-bold mb-4 dark:text-white text-dark">
          <span className="text-primary">Nayan</span> Chauhan
        </div>
        <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase">&copy; 2025 Chauhan Nayan | Premium Portfolio</p>
      </footer>
    </div>
  );
}

// --- Helper Components ---
const InternshipItem = ({ title, company, date, desc }: { title: string, company: string, date: string, desc: string }) => (
  <div className="bg-gray-50 dark:bg-secondary p-8 rounded-2xl border border-primary/10 border-l-4 border-l-primary hover:shadow-xl transition-all">
    <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
      <h3 className="text-xl font-bold dark:text-white text-dark">{title}</h3>
      <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-xs self-start">{date}</span>
    </div>
    <p className="text-primary/80 font-semibold mb-3">{company}</p>
    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ExperienceCard = ({ role, company, date, points }: { role: string, company: string, date: string, points: string[] }) => (
  <div className="bg-white dark:bg-dark p-8 rounded-2xl border border-primary/10 flex flex-col h-full hover:border-primary/50 transition-all shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-2xl font-bold dark:text-white text-dark">{role}</h3>
        <p className="text-primary font-bold">{company}</p>
      </div>
      <span className="text-primary font-bold text-xs uppercase bg-primary/5 px-2 py-1 rounded border border-primary/20">{date}</span>
    </div>
    <ul className="space-y-3 flex-grow">
      {points.map((p, i) => (
        <li key={i} className="text-gray-600 dark:text-gray-400 text-sm flex gap-3">
          <i className="ri-check-line text-primary"></i>
          {p}
        </li>
      ))}
    </ul>
  </div>
);

const EduEntry = ({ title, school, date, result }: { title: string, school: string, date: string, result: string }) => (
  <div className="relative mb-12 last:mb-0">
    <div className="absolute -left-[49px] top-2 w-6 h-6 rounded-full bg-primary border-4 border-gray-50 dark:border-secondary shadow-[0_0_15px_rgba(212,175,55,0.4)]"></div>
    <div className="bg-white dark:bg-dark/40 p-8 rounded-2xl border border-primary/5 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <h3 className="text-2xl font-bold dark:text-white text-dark">{title}</h3>
        <span className="text-primary font-bold">{date}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-3">{school}</p>
      <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold border border-primary/20">{result}</div>
    </div>
  </div>
);

const ProjectCard = ({ title, desc, img, tags, link }: { title: string, desc: string, img: string, tags: string[], link: string }) => (
  <div className="bg-gray-50 dark:bg-secondary rounded-2xl overflow-hidden border border-primary/10 group h-full flex flex-col hover:border-primary/50 transition-all">
    <div className="aspect-video overflow-hidden">
      <img src={img} className="w-full h-full object-cover" alt={title} />
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold dark:text-white text-dark mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-500 text-sm mb-4 flex-grow">{desc}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => <span key={tag} className="bg-primary/5 text-primary text-[10px] px-2 py-1 rounded border border-primary/10 font-bold uppercase">{tag}</span>)}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="bg-primary text-dark text-center font-bold py-2 rounded-xl hover:bg-accent transition-all uppercase text-sm tracking-widest">Demo</a>
    </div>
  </div>
);

const ContactInfoItem = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="flex items-start gap-4 group">
    <div className="w-10 h-10 min-w-[40px] rounded-xl bg-primary/5 flex items-center justify-center text-primary text-xl group-hover:bg-primary group-hover:text-dark transition-all">
      <i className={icon}></i>
    </div>
    <div className="overflow-hidden">
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{label}</p>
      <p className="text-gray-700 dark:text-gray-200 font-medium text-sm md:text-base break-all">{value}</p>
    </div>
  </div>
);

const InputField = ({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) => (
  <div className="space-y-1 w-full">
    <label className="text-gray-500 text-xs font-bold uppercase tracking-widest">{label}</label>
    <input 
      type={type} 
      className="w-full bg-white dark:bg-dark border border-primary/10 rounded-xl p-4 focus:border-primary outline-none dark:text-white text-dark transition-all text-sm" 
      placeholder={placeholder} 
    />
  </div>
);
