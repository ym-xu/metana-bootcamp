import React from "react";
import Footer from "../components/Footer";
import profileImage from './../maomao.jpg';

function Home() {
    const profile = {
        name: "Yiming",
        role: "Data & AI Engineer",
        bio: "new graduate of computer science with two years of AI research experience, with strong interest in LLM and Gen-AI, especially cross-modal/multi-modal retrieval/question answering/generation",
    };

    return (
        <div className="constainer mx-auto px-4 py-8">

            <section className="mt-6 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
                <div className="md:ml-4">
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p>{profile.bio}</p>
                </div>
                <img src={profileImage} alt={profile.name} className="w-full md:w-1/8 lg:w-1/12 h-auto rounded"/>
            </section>
            <Experience />
            <Education />
            <Publications />

            <Footer />
        </div>
    );
}

function Education() {
    return (
        <section className="mt-6 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
            <div className="container mx-auto px-4 py-1">
                <h2 className="text-2xl font-bold">Education</h2>
                <ul>
                    <li>
                        <h3 className="text-lg font-bold">University of Amsterdam</h3>
                        <p>Master of Science in Computer Science</p>
                        <p>2021 - 2023</p>
                    </li>
                    <li>
                        <h3 className="text-lg font-bold">Henan University</h3>
                        <p>Bachelor of Science in Computer Science</p>
                        <p>2015 - 2019</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}

function Publications() {
    return (
        <section className="mt-6 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
            <div className="container mx-auto px-4 py-1">
                <h2 className="text-2xl font-bold">Publications</h2>
                <ul>
                    <li>
                        <h3 className="text-l font-bold">Retrieval-based Question Answering with Passage Expansion using a Knowledge Graph.</h3>
                        <p>Benno Kruit, Yiming Xu*, Jan-Christoph Kalo,</p>
                        <p> LREC-COLING 2024.</p>
                    </li>
                    <li>
                        <h3 className="text-l font-bold">Multihead Attention-Based Audio Image Generation with Cross-Modal Shared Weight Classifier.</h3>
                        <p>Yiming Xu</p>
                        <p> IJCNN 2023</p>
                    </li>
                    <li>
                        <h3 className="text-l font-bold">Fine-Grained Label Learning via Siamese Network for Cross-modal Information Retrieval.</h3>
                        <p>Yiming Xu, Jing Yu, Yue Hu, Jingjing Guo, Jianlong Tan</p>
                        <p> ICCS 2019</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}   

function Experience() {
    return (
        <section className="mt-6 bg-white rounded-lg shadow p-6 flex flex-col md:flex-row">
            <div className="container mx-auto px-4 py-1">
                <h2 className="text-2xl font-bold">Experience</h2>
                <ul>
                    <li>
                        <h3 className="text-lg font-bold">Data & AI Engineer</h3>
                        <p>Amsterdam & Shanghai</p>
                        <p>2023 - Present</p>
                    </li>
                    <li>
                        <h3 className="text-lg font-bold">Research Assistance</h3>
                        <p>Beijing, China</p>
                        <p>2019 - 2020</p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
export default Home;