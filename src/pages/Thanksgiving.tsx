import React from 'react';
import { Heart, Instagram, Sparkles } from 'lucide-react';
import CommunitySubmissionFeed from '../components/CommunitySubmissionFeed';
import Card from '../components/Card';

const gratitudeExamples = [
  "I'm grateful my friend saved me a seat at lunch today without me asking.",
  "I'm grateful my dad drove me to school even though he was running late for work.",
  "I'm grateful the sub in Bio didn't make us do the packet.",
  "I'm grateful my sister let me borrow her charger because mine disappeared again.",
  "I'm grateful my teacher checked in on me after class when I looked stressed.",
  "I'm grateful that my best friend waited for me after 7th period even though I was slow packing up.",
  "I'm grateful the rain stopped before practice so we didn't have to run inside.",
  "I'm grateful my mom remembered to buy the yogurt I like.",
  "I'm grateful my coach told me I improved, even if it was small.",
  "I'm grateful I finally understood the stats homework after struggling with it for days.",
  "I'm grateful my friend sent me notes from class when I was absent.",
  "I'm grateful my teacher let me redo the quiz because she knew I had a bad week.",
  "I'm grateful the kid sitting next to me in APUSH shared his highlighters.",
  "I'm grateful my grandma called me to ask how school is going.",
  "I'm grateful I had time to take a nap after school for once.",
  "I'm grateful that someone complimented my presentation because I was nervous the whole time.",
  "I'm grateful my English teacher recommended a book I ended up actually liking.",
  "I'm grateful the fire alarm didn't go off during first period like it usually does.",
  "I'm grateful my mom didn't get mad when I forgot to do the dishes again.",
  "I'm grateful a stranger held the elevator when I was carrying all my stuff.",
  "I'm grateful my friend invited me to study with her, because I've been feeling kind of alone lately."
];

const Thanksgiving: React.FC = () => {
  return (
    <div className="min-h-screen bg-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="bg-gradient-to-br from-emerald-100 via-white to-emerald-50 rounded-3xl p-8 shadow-sm border border-emerald-100">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            THANK YOU FROM THE DFM TEAM!
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-900 mt-4">
            Thanksgiving Message from the Dear Future Me Team
          </h1>
          <div className="mt-6 space-y-4 text-lg text-emerald-900 leading-relaxed">
            <p>
              From all of us at Dear Future Me, thank you. This project exists so students can pause, reflect, and reconnect with who they are, even in high-pressure environments, and seeing so many people resonate with that means everything.
            </p>
            <p>
              Thanks to your support, DFM is just getting started. We’re going to update our app and socials more consistently; launch new campaigns and workshops, including our series on academic-performance related stimulant misuse; and keep expanding the tools we offer so students feel grounded, supported, and less alone.
            </p>
            <p>
              If you want to follow along, check out our Instagram: <a href="https://instagram.com/dearfuture_.me" className="text-emerald-700 underline" target="_blank" rel="noreferrer">@dearfuture_.me</a>
            </p>
            <p>
              Thank you for believing in what we’re building; we’re grateful for every one of you.
            </p>
            <p className="font-semibold">
              – The Dear Future Me Team
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://instagram.com/dearfuture_.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 py-3 rounded-md bg-emerald-600 text-white text-sm font-medium shadow hover:bg-emerald-700 transition-colors"
            >
              <Instagram size={18} className="mr-2" />
              Follow @dearfuture_.me
            </a>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <Card>
            <div className="space-y-4">
              <div className="flex items-center text-emerald-700">
                <Heart className="mr-3" />
                <span className="uppercase tracking-wide text-sm font-semibold">Holiday Gratitude Spotlight</span>
              </div>
              <h2 className="text-3xl font-bold text-emerald-900">What are you thankful for?</h2>
              <p className="text-gray-700 leading-relaxed">
                Share your gratitude and thank-yous with the Dear Future Me community. Your note can be as tiny or detailed as you want—what matters is that it’s real. These stories help other students feel less alone during a season that can feel complicated.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Post anything from a small kindness to a huge win. Just like our Non-Resume Accomplishments feed, everything is anonymous, deletable with your key, and read by people who get it.
              </p>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <div className="flex items-center text-emerald-700">
                <Sparkles className="mr-3" />
                <span className="uppercase tracking-wide text-sm font-semibold">Need a prompt?</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Think about someone who made this week easier, a moment you felt seen, or an everyday thing you don’t usually notice. Gratitude doesn’t have to be profound—you just have to mean it.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Scroll down for a few sparks from the community if you need help getting started.
              </p>
            </div>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-emerald-900">Share with the community</h2>
          <CommunitySubmissionFeed
            tableName="thanksgiving_gratitude"
            title="Community Gratitude Wall"
            description="Leave a short note of thanks to a person, place, or moment that's helping you thrive right now. Every submission is anonymous, and you'll get a delete key so you’re always in control."
            textareaLabel="Your gratitude note"
            placeholder="I'm grateful for..."
            submitButtonLabel="Share Gratitude"
            emptyState="No gratitude notes yet. Be the first to write one!"
            listTitle="Recent Gratitude Notes"
            entryNoun="gratitude note"
            icon={<Heart className="text-emerald-500" size={24} />}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-emerald-900">Gratitude sparks</h2>
          <p className="text-gray-700">Use these community-inspired sparks to kickstart your own thank-you.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gratitudeExamples.map((example) => (
              <div key={example} className="bg-white rounded-xl border border-emerald-100 p-4 shadow-sm">
                <p className="text-gray-800 leading-relaxed">&ldquo;{example}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Thanksgiving;
