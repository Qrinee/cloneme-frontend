import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Zap, Sparkles, Gem, Crown, Flame, Infinity, Coins } from "lucide-react";

export default function Content() {
  const [activeTab, setActiveTab] = useState('subscription');


  const subscriptionPlans = [
    {
      name: "Starter",
      credits: "500 credits/mo",
      price: "$9.99/mo",
      link: "https://buy.stripe.com/4gM7sK56W9PPeICeZN6sw02",
      icon: <Zap className="w-6 h-6 text-red-400" />,
      color: "bg-red-900",
      popular: false,
      messages: "2,000 messages/mo",
      value: "Create 1 AI girl + 1,300 messages",
    },
    {
      name: "Premium",
      credits: "1,500 credits/mo",
      price: "$19.99/mo",
      link: "https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01",
      icon: <Sparkles className="w-6 h-6 text-pink-400" />,
      color: "bg-pink-900",
      popular: true,
      messages: "6,000 messages/mo",
      value: "Create 4 AI girls + 2,900 messages",
    },
    {
      name: "Ultimate",
      credits: "5,000 credits/mo",
      price: "$39.99/mo",
      link: "https://buy.stripe.com/dRmbJ042S4vv6c6cRF6sw00",
      icon: <Crown className="w-6 h-6 text-yellow-400" />,
      color: "bg-yellow-900",
      popular: false,
      messages: "20,000 messages/mo",
      value: "Create 14 AI girls + 11,400 messages",
    }
  ];

  const oneTimePlans = [
    {
      name: "Quickie",
      credits: "100 credits",
      price: "$3.99",
      link: "https://buy.stripe.com/28E9ASdDs1jjfMGdVJ6sw05",
      icon: <Flame className="w-6 h-6 text-red-400" />,
      color: "bg-red-900/50",
      messages: "400 messages",
      value: "Create 0.28 AI girl",
    },
    {
      name: "Session",
      credits: "200 credits",
      price: "$7.99",
      link: "https://buy.stripe.com/eVqcN4bvkfa90RM04T6sw04",
      icon: <Gem className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-900/50",
      messages: "800 messages",
      value: "Create 0.57 AI girl",
    },
    {
      name: "Marathon",
      credits: "350 credits",
      price: "$14.99",
      link: "https://buy.stripe.com/fZu3cudDs7HHgQK6th6sw03",
      icon: <Infinity className="w-6 h-6 text-pink-400" />,
      color: "bg-pink-900/50",
      messages: "1,400 messages",
      value: "Create 1 AI girl",
    }
  ];

  return (
    <DialogContent 
      className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] bg-[#0a0a0f] border-red-900/30 overflow-hidden"
    >
      {/* Premium Header */}
      <div className="text-center py-6 px-4 ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-2"
        >
          <Coins className="w-5 h-5 text-red-400" />
          <span className="text-xs font-bold tracking-[0.3em] text-red-400 uppercase">Credit System</span>
          <Coins className="w-5 h-5 text-red-400" />
        </motion.div>
        <DialogTitle className="text-3xl md:text-4xl font-bold text-white">
          Premium Subscription
        </DialogTitle>
        <p className="text-white/40 mt-2 text-sm max-w-md mx-auto">
          Get unlimited messages and 1 free AI Girlfriend creation per month!
        </p>
      </div>



      {/* Tab Navigation */}
      <div className="flex justify-center mb-6 px-4">
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">

          <button
            onClick={() => setActiveTab('one-time')}
            className={`px-6 py-2.5 cursor-pointer rounded-full text-sm font-bold transition-all ${
              activeTab === 'one-time' 
                ? 'bg-red-800 text-white shadow-lg' 
                : 'text-white/40 hover:text-white'
            }`}
          >
            One-Time Packs
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-6">
        {(activeTab === 'subscription' ? subscriptionPlans : oneTimePlans)
          .map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-yellow-500 text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Best Value
                  </span>
                </div>
              )}
              
              <div className={`h-full bg-gradient-to-br ${plan.color} rounded-3xl border border-white/10 overflow-hidden relative`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white text-center mb-1">{plan.name}</h3>
                  <p className="text-white/50 text-xs text-center mb-2">{plan.credits}</p>
                  <p className="text-yellow-300/70 text-[10px] text-center mb-4">{plan.messages}</p>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price.split('/')[0]}</span>
                    {plan.price.includes('/mo') && <span className="text-white/40 text-sm">/mo</span>}
                  </div>

                  {/* Value description */}
                  <div className="text-center mb-4">
                    <span className="text-green-400 text-xs font-medium">{plan.value}</span>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className={`w-full cursor-pointer font-bold text-sm py-6 rounded-2xl transition-all active:scale-95 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-lg shadow-yellow-500/20'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                    onClick={() => window.location = plan.link}
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Trust badges */}
      <div className="flex justify-center gap-8 pb-6 text-white/30 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>100% Anonymous</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span>Never Expires</span>
        </div>
      </div>
    </DialogContent>
  );
}