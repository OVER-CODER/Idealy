'use client'

import React from 'react'
import { SignInButton, SignUpButton, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Lightbulb, Users, MessageSquare, TrendingUp, Sparkles, Rocket, Menu, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Page = () => {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  return (
    <div className="w-full">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F5DC]/95 backdrop-blur-sm border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-black hover:text-black/70 transition-colors">
                Idealy
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-lg font-medium text-black/70 hover:text-black transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-lg font-medium text-black/70 hover:text-black transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-lg font-medium text-black/70 hover:text-black transition-colors">
                About
              </a>
            </div>
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isLoaded && (
                isSignedIn ? (
                  <Button 
                    size="sm" 
                    className="bg-black hover:bg-black/80 text-white border-2 border-black px-6 py-2 text-base"
                    onClick={() => router.push('/dashboard')}
                  >
                    <span className="flex items-center gap-2">
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                ) : (
                  <>
                    <Button size="sm" className="bg-transparent hover:bg-black/5 text-black border border-black/20 px-6 py-2 text-base">
                      <SignInButton mode="modal" />
                    </Button>
                    <Button size="sm" className="bg-black hover:bg-black/80 text-white border-2 border-black px-6 py-2 text-base">
                      <SignUpButton mode="modal" />
                    </Button>
                  </>
                )
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-black">
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="min-h-screen px-4 py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/5 border border-black/10">
              <Sparkles className="w-5 h-5 text-black" />
              <span className="text-lg font-medium text-black">Where Great Ideas Come to Life</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[1.1] tracking-tight">
              Let Your Ideas
              <span className="block">
                Shine with Idealy
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-black/70 font-light leading-relaxed max-w-2xl">
              A collaborative platform where innovators share ideas, connect with like-minded individuals, and turn visions into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              {isLoaded && (
                isSignedIn ? (
                  <Button 
                    size="lg" 
                    className="bg-black hover:bg-black/80 text-white border-2 border-black px-12 py-7 text-xl font-medium rounded-xl"
                    onClick={() => router.push('/dashboard')}
                  >
                    <span className="flex items-center gap-2">
                      Go to Your Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="bg-black hover:bg-black/80 text-white border-2 border-black px-12 py-7 text-xl font-medium rounded-xl">
                      <SignUpButton mode="modal" />
                    </Button>
                    
                    <Button size="lg" className="bg-transparent hover:bg-black/5 text-black border-2 border-black px-12 py-7 text-xl font-medium rounded-xl">
                      <SignInButton mode="modal" />
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative w-full h-[300px] md:h-[700px] lg:h-[700px]">
            <div className="relative w-[600px] h-[600px] bg-white border-2 border-black/10 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/assets/image1.png" 
                alt="Idealy Platform" 
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-24 border-t border-black/10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              Why Choose Idealy?
            </h2>
            <p className="text-2xl md:text-3xl text-black/70 font-light">
              Everything you need to share, develop, and grow your ideas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Share Ideas</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Post your innovative ideas and thoughts. Express your creativity in a supportive community that values innovation.
              </p>
            </div>
            
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Get Feedback</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Receive valuable feedback from a community of thinkers. Refine your ideas through constructive discussions.
              </p>
            </div>
            
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Build Communities</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Connect with like-minded individuals. Join or create communities around specific topics and interests.
              </p>
            </div>
            
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Track Progress</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Monitor your ideas' engagement and growth. See which concepts resonate most with the community.
              </p>
            </div>
            
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Discover Inspiration</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Explore a feed of innovative ideas from creators worldwide. Find inspiration for your next big project.
              </p>
            </div>
            
            <div className="bg-white border border-black/10 rounded-xl p-10 hover:border-black/30 transition-all hover:shadow-lg">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-4">Launch Together</h3>
              <p className="text-lg text-black/70 leading-relaxed">
                Collaborate with others to bring ideas to life. Turn conversations into concrete actions and projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-24 border-t border-black/10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              How It Works
            </h2>
            <p className="text-2xl md:text-3xl text-black/70 font-light">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-20 h-20 bg-black rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                1
              </div>
              <div className="flex-1 bg-white border border-black/10 rounded-xl p-10">
                <h3 className="text-3xl font-bold text-black mb-4">Create Your Account</h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  Sign up for free and set up your profile. Tell the community about yourself and your interests.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-20 h-20 bg-black rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                2
              </div>
              <div className="flex-1 bg-white border border-black/10 rounded-xl p-10">
                <h3 className="text-3xl font-bold text-black mb-4">Share Your Ideas</h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  Post your ideas, concepts, and projects. Add details, context, and invite others to contribute.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-20 h-20 bg-black rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                3
              </div>
              <div className="flex-1 bg-white border border-black/10 rounded-xl p-10">
                <h3 className="text-3xl font-bold text-black mb-4">Engage & Collaborate</h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  Connect with others, provide feedback, and collaborate on exciting projects. Build meaningful relationships.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-20 h-20 bg-black rounded-xl flex items-center justify-center text-white text-3xl font-bold">
                4
              </div>
              <div className="flex-1 bg-white border border-black/10 rounded-xl p-10">
                <h3 className="text-3xl font-bold text-black mb-4">Bring Ideas to Life</h3>
                <p className="text-lg text-black/70 leading-relaxed">
                  Watch your ideas evolve and grow. Turn feedback into action and make your vision a reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="px-4 py-24 border-t border-black/10 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-black/10 rounded-2xl p-16 md:p-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-8">
              Ready to Share Your Ideas?
            </h2>
            <p className="text-2xl md:text-3xl text-black/70 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Join thousands of innovators, creators, and thinkers who are shaping the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-black hover:bg-black/80 text-white border-2 border-black px-12 py-7 text-xl font-medium rounded-xl">
                <SignUpButton mode="modal" />
              </Button>
              
              <p className="text-black/50 text-lg">
                No credit card required • Free forever
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page