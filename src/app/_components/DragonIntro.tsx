import { clsxm } from '@/utils';
import DragonBorder from './DragonBorder';
import Tag from '@/components/ui/tag';

export default function DragonIntro({ className }: { className?: string }) {
  return (
    <div
      className={clsxm(
        'relative mt-15 border border-gray-600 bg-black/60 px-[3vw] py-[3.52vw] backdrop-blur-sm xl:px-7.5 xl:py-11',
        className,
      )}
    >
      <DragonBorder className="inset-[0.64vw] -z-10 xl:inset-2" />
      <div className="flex-center">
        <img src="/img/dragon-intro-title.webp" alt="dragonerse neo" className="w-[38.4vw] xl:w-[480px]" />
      </div>
      <div className="flex-center">
        <div className="mt-[0.96vw] w-[56vw] text-center text-[1.12vw]/[1.92vw] xl:mt-3 xl:w-[700px] xl:text-sm/6">
          Dragonverse Neo is the first-ever co-created and co-governed open world, enabling MOBOXers to contribute the content
          and decide the evolution.
        </div>
      </div>

      <div className="mt-[3.84vw] grid grid-cols-2 gap-x-[2.88vw] gap-y-[3.84vw] xl:mt-12 xl:gap-x-9 xl:gap-y-12">
        <div>
          <div className="relative h-[22.24vw] w-full overflow-hidden border border-gray-600 pt-[1.92vw] xl:h-[278px] xl:pt-6">
            <img src="/img/ugc.webp" alt="ugc" className="absolute bottom-0 left-0 h-auto w-full" />
            <div className="relative text-center text-[1.92vw]/[1.92vw] xl:text-2xl/6">Co-Creation</div>
          </div>
          <div className="mt-[1.28vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:text-xs/6">
            With the intuitive and powerful 3D-enhanced engine, every MOBOXer has the opportunity to shape every facet of the
            game.
          </div>
        </div>

        <div>
          <div className="relative h-[22.24vw] w-full overflow-hidden border border-gray-600 pt-[1.92vw] xl:h-[278px] xl:pt-6">
            <img src="/img/co-governance.webp" alt="co-governance" className="absolute bottom-0 left-0 h-auto w-full" />
            <div className="relative text-center text-[1.92vw]/[1.92vw] xl:text-2xl/6">Co-Governance</div>
          </div>
          <div className="mt-[1.28vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:text-xs/6">
            As a MOBOXer, whether you’re a holder of $MBOX / veMBOX, a MODragon enthusiast, or a MOMO owner, you wield
            substantial influence over the game’s development.
          </div>
        </div>

        <div>
          <div className="relative h-[22.24vw] w-full overflow-hidden border border-gray-600 pt-[1.92vw] xl:h-[278px] xl:pt-6">
            <img src="/img/tokenomics.webp" alt="tokenomics" className="absolute bottom-0 left-0 h-auto w-full" />
            <div className="relative text-center text-[1.92vw]/[1.92vw] xl:text-2xl/6">Tokenomics</div>
          </div>
          <div className="mt-[1.28vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:text-xs/6">
            Dragonverse Neo is transcending the conventional patterns to more sustainable open economies. Tokenomics redefines
            the utility of MOBOX Assets, expanding the utilities beyond their traditional roles.
          </div>
        </div>

        <div>
          <div className="relative h-[22.24vw] w-full overflow-hidden border border-gray-600 pt-[1.92vw] xl:h-[278px] xl:pt-6">
            <img src="/img/interactive.webp" alt="interactive" className="absolute bottom-0 left-0 h-auto w-full" />
            <div className="relative text-center text-[1.92vw]/[1.92vw] xl:text-2xl/6">Interactive Gameplay</div>
            <div className="relative mt-[1.6vw] flex flex-wrap gap-[0.64vw] pl-[1.28vw] xl:mt-5 xl:gap-2 xl:px-4">
              <Tag className="bg-white/12 text-white">#3D-enhanced Engine</Tag>
              <Tag className="bg-white/12 text-white">#Anime-Style Aesthetic</Tag>
              <Tag className="bg-white/12 text-white">#Interactive NPCs</Tag>

              <Tag className="bg-white/12 text-white">#Character Customization</Tag>
              <Tag className="bg-white/12 text-white">#Cinematic-quality Visuals</Tag>
              <Tag className="bg-white/12 text-white">#Free Exploration</Tag>
            </div>
          </div>
          <div className="mt-[1.28vw] text-[0.96vw]/[1.92vw] xl:mt-4 xl:text-xs/6">
            Dragonverse Neo elevates the gaming experience with its 3D-enhanced engine. Each {"player's"} journey is unique,
            woven with the threads of their choices.
          </div>
        </div>
      </div>
    </div>
  );
}
