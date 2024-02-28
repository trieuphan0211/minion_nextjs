import Image from "next/image";
import avatar from "@/public/images/avatar.jpg";
import { title } from "process";

const informations = [
  { title: "Name", content: "Phan Ngọc Triệu" },
  { title: "Birth", content: "02/11/2002" },
  { title: "Phone", content: "+84 372106260" },
  { title: "Email", content: "trieuphan0211@gmail.com" },
  { title: "Address", content: "Quảng Ngãi" },
];
const overviews = [
  "Over 2 years of experience in programming with good communication and quick learning skills",
  "Strengths: Front-end technology and Back-end web application development",
  "Proficiency in HTML, CSS, JavaScript",
  "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
  "Thorough under standing of React.js and it score principles",
  " Experience with popular React.js workflows (such as Flux or Redux)",
  " Familiarity with newer specifications of EcmaScript",
  "Experience with data structure libraries (e.g., Immutable.js)",
  " Strong Experience in: PHP, JavaScript (ReactJS, React-native), MySQL, NoSQL, GraphQL, Redis, JSON, API, Docker, Kubernetes, Rancher, AWS services",
  "Proficient use of source code management tools: SVN, GIT",
  "Proficiency in operating systems: Linux (Ubuntu, OSX), Windows",
];

export default function CurriculumVitae() {
  return (
    <div className="cv mx-auto my-5 max-w-[1300px] px-6 py-10 text-base shadow-2xl rounded-lg ">
      <div className="flex gap-16 mx-auto">
        <div className="">
          <Image
            className="rounded-full"
            src={avatar}
            width={300}
            height={300}
            alt="Avatar"
          />
        </div>
        <div className="w-full">
          <h1 className="text-7xl font-bold mb-3">Phan Ngọc Triệu</h1>
          <p className="text-2xl font-semibold mb-6">Front-end Developer</p>
          <div className="grid grid-cols-2 w-full">
            {informations.map((item, index) => (
              <article
                key={item.title + "_" + index}
                className="flex gap-3 mb-4"
              >
                <h4 className="font-bold">{item.title}:</h4>
                <p className="font-medium">{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <section>
        <div className="border-b-4 border-yellow-400 mb-4">
          <h2 className="bg-yellow-400 inline-block h-full p-2 font-bold text-white">
            Overview
          </h2>
        </div>
        <ul>
          {overviews.map((item, index) => (
            <li key={index} className="mb-3 font-medium">
              - {item}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="border-b-4 border-yellow-400 mb-4">
          <h2 className="bg-yellow-400 inline-block h-full p-2 font-bold text-white">
            Work experience
          </h2>
        </div>
      </section>
      <section>
        <div className="border-b-4 border-yellow-400 mb-4">
          <h2 className="bg-yellow-400 inline-block h-full p-2 font-bold text-white">
            Education
          </h2>
        </div>
      </section>
      <section>
        <div className="border-b-4 border-yellow-400 mb-4">
          <h2 className="bg-yellow-400 inline-block h-full p-2 font-bold text-white">
            Skills
          </h2>
        </div>
      </section>
      <section>
        <div className="border-b-4 border-yellow-400 mb-4">
          <h2 className="bg-yellow-400 inline-block h-full p-2 font-bold text-white">
            Projects
          </h2>
        </div>
      </section>
    </div>
  );
}
