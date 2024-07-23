import Image from "next/image";

function Navbar(){
    return(
        <header>
            <nav className="flex items-center justify-between pt-4 pb-4 border-b-[0.5px] border-[#B94CED]">
                <Image src={'/graphic-card.svg'} width={50} height={50} alt='graphic card logo' className="ml-6" />
                <a href="https://github.com/villarrealjoaquin/PartitureAI" target="_blank" rel="noopener noreferrer"><Image src={'/octocat.svg'} width={50} height={50} alt='github octocat' className="mr-6" /></a>
            </nav>
        </header>
    )
}

export default Navbar;