import LoginModal from "@/components/LoginModal";
import ParticleRing from "@/components/ParticleRing";
const BACpage = () => {
  return (
    <div className=" bg-purple-500 w-screen h-screen flex flex-col justify-center px-20   items-center  py-20">
      <div className="absolute w-screen h-full z-0">
        <ParticleRing />
      </div>

      <div className="w-full pb-20 h-auto text-center text-white z-10">
        <h1 className="text-4xl lg:text-7xl">
          BAC <br />
        </h1>
      </div>
      {/*Pass Props Here then*/}
      <div className="z-10  ">
        <LoginModal route="/BAC/BACPersonalForm" />
      </div>
    </div>
  );
};

export default BACpage;
