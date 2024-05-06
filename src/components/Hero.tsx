import LinkButton from "../components/LinkButton";

const Hero = () => {
  return (
    <div
      className="h-full bg-center bg-contain bg-no-repeat flex flex-col justify-center items-start"
      style={{ backgroundImage: "url('pdf.png')" }}
    >
      <div
        className={`absolute h-[120%] bg-blue-400 w-[250px]
left-[23rem] rotate-12 translate-x-[22rem]
          `}
      ></div>
      <div className="px-[10rem] flex z-10 flex-col items-center gap-5">
        <div>
          <h1 className="text-[48px]  font-bold text-right">
            welcome to coding de<span className="text-white">stro's</span>{" "}
            <br />
            pdf <span className="text-white">editor</span>
          </h1>
        </div>
        <div>
          <p className="text-lg italic">
            Ease of deleting & extracting the pdf pages
          </p>
        </div>
        <div className="flex flex-wrap max-w-[400px] justify-center ">
          <LinkButton path="/pages/extract">Extract Pages</LinkButton>
          <LinkButton path="/pages/delete">Delete Pages</LinkButton>
          <LinkButton path="/pdf/merge">Merge PDFs</LinkButton>
          <LinkButton path="/pdf/resize">Resize PDF</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
