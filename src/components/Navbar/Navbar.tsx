import { GraphicCard, Octocat } from "../Icons";

function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between pt-4 pb-4 border-b-[0.5px] border-[#B94CED]">
        <GraphicCard className={"ml-6"} width="50px" height="50px" />
        <a
          href="https://github.com/villarrealjoaquin/PartitureAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Octocat className={"mr-6"} width="50px" height="50px" />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
