
export const CaseStudiesContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Case Studies</h3>
    <p className="text-gray-400">Deep dives into my UX design process and problem solving.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {[1, 2].map((i) => (
            <div key={i} className="aspect-video bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center">
                Project {i} Placeholder
            </div>
        ))}
    </div>
  </div>
);

export const WallpapersContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Wallpapers</h3>
    <p className="text-gray-400">Minimalist and abstract wallpapers for your devices.</p>
  </div>
);

export const FigmaCommunityContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Figma Community</h3>
    <p className="text-gray-400">Resources, plugins, and UI kits shared with the community.</p>
  </div>
);

export const IOSDevelopmentContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">iOS Development</h3>
    <p className="text-gray-400">Native iOS apps built with Swift and SwiftUI.</p>
  </div>
);

export const CoursesContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Courses</h3>
    <p className="text-gray-400">Educational content and tutorials I&apos;ve created.</p>
  </div>
);

export const NotionTemplatesContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Notion Templates</h3>
    <p className="text-gray-400">Productivity systems and templates for Notion.</p>
  </div>
);

export const GraphicDesignContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Graphic Design</h3>
    <p className="text-gray-400">Branding, social media assets, and digital art.</p>
  </div>
);

export const StickersContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Stickers</h3>
    <p className="text-gray-400">Fun and custom sticker packs for devs.</p>
  </div>
);

export const ChromeExtensionsContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">Chrome Extensions</h3>
    <p className="text-gray-400">Tools to enhance your browsing experience.</p>
  </div>
);

export const VSCodeExtensionsContent = () => (
  <div className="p-12 text-center border-t border-white/20">
    <h3 className="text-3xl font-bold mb-4">VSCode Extensions</h3>
    <p className="text-gray-400">Themes and utilities for Visual Studio Code.</p>
  </div>
);
