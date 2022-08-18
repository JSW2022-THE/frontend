import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import knowData from "../../public/knowledgeData.json";
import { useState } from "react";

export default function WorkerKnowledge() {
  const [random, setRandom] = useState(Math.floor(Math.random() * 5));

  return (
    <>
      <Header />
      <BottomNavigation isWorker={true} />
      <section className="p-6">
        <div className="h-[300px] w-full  flex-col justify-between p-10 items-center bg-white rounded-2xl">
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-bold">질문</h1>
            <h1 className="font-semibold">{knowData[random].question}</h1>
          </div>
          <span className="flex w-full py-4 font-bold text-[60px] mt-5">
            <button
              onClick={() => {
                knowData[random].answer === false
                  ? alert("정답입니다. " + knowData[random].detail)
                  : alert("틀렸습니다. " + knowData[random].detail);
                setRandom(Math.floor(Math.random() * 5));
              }}
              className="w-full h-[100px] mx-2 bg-slate-200 rounded-3xl"
            >
              X
            </button>
            <button
              onClick={() => {
                knowData[random].answer === true
                  ? alert("정답입니다. " + knowData[random].detail)
                  : alert("틀렸습니다. " + knowData[random].detail);
                setRandom(Math.floor(Math.random() * 5));
              }}
              className="w-full h-[100px] mx-2 bg-green-400 rounded-3xl"
            >
              O
            </button>
          </span>
        </div>
      </section>
    </>
  );
}
