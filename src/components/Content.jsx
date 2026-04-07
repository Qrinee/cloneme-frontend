import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Flame, Gem, Infinity, Coins } from "lucide-react";
import img1 from '../assets/task_01kmwzbe1tfvp912tg8rwe5hay_1774793926_img_1.webp';
import img2 from '../assets/task_01kmwzmaxbfbtrtm45b78g5cv6_1774794217_img_0.webp';
import img3 from '../assets/task_01kmx0114jf4n8czx2xbegyq4b_1774794633_img_1.webp';

export default function Content({ onClose }) {
  const oneTimePlans = [
    {
      name: "Quickie",
      credits: "50 credits",
      price: "$3.99",
      link: "https://buy.stripe.com/dRm4gyczo5zz8kebNB6sw08",
      icon: <Flame className="w-6 h-6 text-red-400" />,
      color: "bg-red-900/50",
      value: "1 AI photo",
      image: img1
    },
    {
      name: "Session",
      credits: "200 credits",
      price: "$7.99",
      link: "https://buy.stripe.com/9B69ASfLA4vv6c6eZN6sw07",
      icon: <Gem className="w-6 h-6 text-purple-400" />,
      color: "bg-purple-900/50",
      value: "1 AI video",
      image: img2
    },
    {
      name: "Marathon",
      credits: "400 credits",
      price: "$14.99",
      link: "https://buy.stripe.com/3cIfZgczo9PPdEyaJx6sw06",
      icon: <Infinity className="w-6 h-6 text-pink-400" />,
      color: "bg-pink-900/50",
      value: "8 AI photos",
      image: img3
    }
  ];

  return (
      <DialogContent
        showClose={false}
        className="max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] bg-[#0a0a0f] border-red-900/30 p-0 overflow-hidden max-h-[95dvh] flex flex-col"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors md:hidden"
        >
          <X size={20} />
        </button>
        
        {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Premium Header */}
        <div className="text-center py-4 md:py-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-1"
          >
            <Coins className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-red-400 uppercase">BUY POINTS</span>
            <Coins className="w-4 h-4 text-red-400" />
          </motion.div>
          <DialogTitle className="text-2xl md:text-4xl font-bold text-white">
            One-Time Packs
          </DialogTitle>
          <p className="text-white/40 mt-1 text-xs md:text-sm max-w-md mx-auto">
            Choose a pack to get photos from girls
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 pb-6">
          {oneTimePlans.map((plan, index) => (
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
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={plan.image}
                    alt=""
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-[#0a0a0f]/80" />
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0" />

                <CardContent className="p-6 flex flex-col h-full relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white text-center mb-1">{plan.name}</h3>
                  <p className="text-white/50 text-xs text-center mb-4">{plan.credits}</p>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                  </div>

                  {/* Value description */}
                  <div className="text-center mb-4">
                    <span className="text-green-400 text-xs font-medium">{plan.value}</span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full cursor-pointer font-bold text-sm py-6 rounded-2xl transition-all active:scale-95 ${plan.name === "Marathon"
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black shadow-lg shadow-yellow-500/20'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    onClick={() => window.location = plan.link}
                  >
                    Buy Now
                  </Button>

                </CardContent>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pb-8 text-white/30 text-[10px] md:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>100% Anonymous</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Never Expires</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}