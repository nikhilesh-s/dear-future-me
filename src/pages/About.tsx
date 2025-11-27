import React from 'react';
import { Heart } from 'lucide-react';
import Card from '../components/Card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Dear Future Me</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to help young people develop healthy perspectives on achievement, 
            stress, and self-worth through reflection and community support.
          </p>
        </div>

        {/* Meet the Founders */}
        <Card className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Founders</h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="https://i.imgur.com/MlDPsSr.jpeg"
                alt="Dear Future Me Co-Founders"
                className="w-full max-w-md rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We started Dear Future Me so that students could pause, reflect, and reconnect with their inner voice in the midst of high-pressure academic environments. We wanted to create a space where self-expression, emotional growth, and intentional check-ins feel natural and empowering—because sometimes, the most important person to talk to is your future self.
              </p>
              <p className="text-gray-600 font-medium">
                - Nikhilesh Suravarjjala & Suhani Gupta
              </p>
            </div>
          </div>
        </Card>

        {/* Team Bio Section */}
        <Card className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Team Bio</h2>
          
          {/* Co-Founders Row */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Co-Founders</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://i.imgur.com/5ZiqRUv.jpeg"
                  alt="Nikhilesh Suravarjjala"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Nikhilesh Suravarjjala</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hey, I'm Nikhilesh Suravarjjala. I've always been drawn to building things that combine innovation with impact, from wildfire detection technologies to digital learning platforms. To me, Dear Future Me is one of those projects I have that's super close to my heart because the main purpose of this initiative is so that high schoolers could take time to pause, reflect, and really connect with who they are even during super high-pressure moments (which happen a lot in the bay area…). DFM's vision was to create a space where emotional growth and intentional check-ins feel empowering, and I'm proud of how our team has brought that to life.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://i.imgur.com/unScfT5.jpeg"
                  alt="Suhani Gupta"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Suhani Gupta</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hi, I'm Suhani Gupta, a senior at Dublin High School. I've always cared about mental health because I've seen how much academic pressure can affect people, including myself and those around me. Through HOSA, projects like InsightInno with the Dublin Mayor, and other experiences, I've realized how important it is to create spaces where students feel supported beyond academics. That's why I helped start Dear Future Me. To me, this project is about giving students room to breathe, reflect, and remind themselves that who they are matters more than any grade on a transcript.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row: Social Media Manager & Education Officers */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Team Members</h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://i.imgur.com/YHiKz3n.jpeg"
                  alt="Sophia Wang"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Sophia Wang</h4>
                <p className="text-emerald-600 text-sm font-medium mb-3">Marketing Manager</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hi, I'm Sophia Wang. There are times when academic and school pressures trigger self-deprecating thoughts that break me down and ruin the rest of my day. What I found to be helpful for me is remembering and noting the things that make me unique beyond academics, which is why I support Dear Future Me to help others in similar situations. This year, I hope to engage more of our audience by expanding our social media presence with content that brings comfort and stress relief. As more people take the initiative to use our Dear Future Me platform, I want to highlight their experiences and help them feel proud of what they do.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://i.imgur.com/8SEQPpB.jpeg"
                  alt="Tanvi Bharadwaj"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Tanvi Bharadwaj</h4>
                <p className="text-emerald-600 text-sm font-medium mb-3">Education Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hi, I'm Tanvi Bharadwaj! I build with purpose, combining my passions for health, tech, and education. What started as a simple letter to myself grew into Dear Future Me, an initiative giving high school students space to explore who they are and what they stand for, beyond college admissions and test scores. I'm proud to have built a community that celebrates each other's achievements, no matter how big or small. Beyond DFM, I build apps to improve health literacy for patients and gamify media literacy for kids. Every project I take on is driven by the same goal: to create tools and experiences that empower people, spark curiosity, and make a real impact.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://i.imgur.com/Y0uSTqw.jpeg"
                  alt="Kiya Sehgal"
                  className="w-24 h-24 rounded-full object-cover shadow-lg mb-4"
                />
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Kiya Sehgal</h4>
                <p className="text-emerald-600 text-sm font-medium mb-3">Education Officer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hi, I'm Kiya Sehgal. I believe in the importance of supporting students' mental health and wanting to create advocacy around it. Having my own challenges with mental health, I have known how important it is to feel supported and heard. That is why when the opportunity came to work on Dear Future Me, I knew it was something important and special that needed to be shared with the world. I hope to help others who struggle by allowing them to feel comfortable in this safe space we provide and empower those individuals.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;