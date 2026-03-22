import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Zap, Sparkles, Gem, Check, Info } from "lucide-react";

export default function Content() {
  const [activeTab, setActiveTab] = useState('subscription');
  const [showTooltip, setShowTooltip] = useState(false);

  const subscriptionPlans = [
    {
      name: "Free Trial",
      messages: "10 messages/month",
      price: "$0/mo",
      link: "#",
      icon: <Zap className="w-5 h-5 text-red-500" />,
      delay: 0.1,
      features: [
        { name: "Monthly Messages", value: "10", included: true },
        { name: "Basic Bots", value: "1", included: true },

        { name: "Priority Support", value: "No", included: false },
      ]
    },
    {
      name: "Standard",
      messages: "100 messages/month",
      price: "$5/mo",
      link: "https://buy.stripe.com/4gM7sK56W9PPeICeZN6sw02",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      delay: 0.2,
      features: [
        { name: "Monthly Messages", value: "100", included: true },
        { name: "Basic Bots", value: "3", included: true },
        { name: "Priority Support", value: "No", included: false },
      ]
    },
    {
      name: "Premium",
      messages: "300 messages/month",
      price: "$12/mo",
      link: "https://buy.stripe.com/bJedR87f4aTTgQK5pd6sw01",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      delay: 0.3,
      features: [
        { name: "Monthly Messages", value: "300", included: true },
        { name: "Basic Bots", value: "10", included: true },
        { name: "Priority Support", value: "Yes", included: true },
      ]
    },
    {
      name: "Ultimate",
      messages: "1000 messages/month",
      price: "$30/mo",
      link: "https://buy.stripe.com/dRmbJ042S4vv6c6cRF6sw00",
      icon: <Gem className="w-5 h-5 text-amber-500" />,
      delay: 0.4,
      features: [
        { name: "Monthly Messages", value: "1000", included: true },
        { name: "Basic Bots", value: "Unlimited", included: true },
        { name: "Priority Support", value: "24/7", included: true },
      ]
    }
  ];

  const oneTimePlans = [
    {
      name: "Starter Pack",
      messages: "50 messages",
      price: "$3",
      link: "https://buy.stripe.com/28E9ASdDs1jjfMGdVJ6sw05",
      icon: <Zap className="w-5 h-5 text-blue-500" />,
      delay: 0.2,
      features: [
        { name: "Total Messages", value: "50", included: true },
        { name: "Expiration", value: "Never", included: true },
      ]
    },
    {
      name: "Pro Pack",
      messages: "200 messages",
      price: "$10",
      link: "https://buy.stripe.com/eVqcN4bvkfa90RM04T6sw04",
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      delay: 0.3,
      features: [
        { name: "Total Messages", value: "200", included: true },
        { name: "Expiration", value: "Never", included: true },
      ]
    },
    {
      name: "Mega Pack",
      messages: "500 messages",
      price: "$20",
      link: "https://buy.stripe.com/fZu3cudDs7HHgQK6th6sw03",
      icon: <Gem className="w-5 h-5 text-amber-500" />,
      delay: 0.4,
      features: [
        { name: "Total Messages", value: "500", included: true },
        { name: "Expiration", value: "Never", included: true },
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    }
  };

  return (
    <DialogContent 
      className="max-w-[95vw] sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[50vw] overflow-y-scroll h-[90vh]"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Renew Your Messages
          </DialogTitle>
          <DialogDescription className="text-center max-w-2xl mx-auto text-xs sm:text-sm">
            Choose a plan to automatically refresh your message count each month or 
            purchase message packs for one-time use
          </DialogDescription>
        </DialogHeader>
      </motion.div>

      {/* Responsive Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-center my-4 sm:my-6">
        <div className="flex flex-col sm:flex-row rounded-lg bg-muted" role="group">
          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-4 py-3 sm:py-2 sm:rounded-l-lg ${
              activeTab === 'subscription' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            } transition-colors`}
          >
            Subscription Plans
          </button>
          <button
            onClick={() => setActiveTab('one-time')}
            className={`px-4 py-3 sm:py-2 sm:rounded-r-lg ${
              activeTab === 'one-time' 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-accent'
            } transition-colors`}
          >
            One-Time Packs
          </button>
        </div>
      </div>

      {/* Responsive Feature Table */}
      <div className="mb-4 sm:mb-6">
        <div className="hidden md:block">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-3 font-medium">Features</th>
                {activeTab === 'subscription' 
                  ? subscriptionPlans.map(plan => (
                      <th key={plan.name} className="p-3 font-medium text-center">
                        {plan.name}
                      </th>
                    ))
                  : oneTimePlans.map(plan => (
                      <th key={plan.name} className="p-3 font-medium text-center">
                        {plan.name}
                      </th>
                    ))
                }
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'subscription' 
                ? subscriptionPlans[0].features 
                : oneTimePlans[0].features
              ).map((feature, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">{feature.name}</td>
                  {activeTab === 'subscription' 
                    ? subscriptionPlans.map(plan => (
                        <td key={`${plan.name}-${idx}`} className="p-3 text-center">
                          {plan.features[idx].included ? (
                            <span className="flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-500 mr-1" />
                              {plan.features[idx].value}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))
                    : oneTimePlans.map(plan => (
                        <td key={`${plan.name}-${idx}`} className="p-3 text-center">
                          {plan.features[idx].included ? (
                            <span className="flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-500 mr-1" />
                              {plan.features[idx].value}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      ))
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden text-sm text-center p-2">
          <p className="font-medium mb-1">Features comparison not available on mobile</p>
          <p className="text-muted-foreground text-xs">
            View on larger screen or see individual plan details below
          </p>
        </div>
      </div>

      {/* Responsive Plans Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid gap-4 md:gap-6 mt-4 ${
          activeTab === 'subscription' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}
      >
        {(activeTab === 'subscription' ? subscriptionPlans : oneTimePlans)
          .map((plan, index) => (
            <motion.div 
              key={`${activeTab}-${index}`} 
              variants={item}
              whileHover={{ y: window.innerWidth > 640 ? -5 : 0 }}
            >
              <Card className={`h-full border-2 ${
                plan.name === "Free Trial" 
                  ? "border-red-300" 
                  : "hover:border-primary"
              } transition-colors`}>
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex items-center justify-center gap-3 mb-2 sm:mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      {plan.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{plan.name}</h3>
                  </div>
                  
                  <p className="text-center text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                    {plan.messages}
                  </p>
                  
                  <div className="flex-1 mb-4 sm:mb-6">
                    <ul className="space-y-1 sm:space-y-2">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          ) : (
                            <span className="w-4 h-4 mr-2">-</span>
                          )}
                          <span className="text-xs sm:text-sm">
                            <span className="font-medium">{feature.name}:</span> {feature.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: window.innerWidth > 640 ? 1.03 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className={`w-full font-semibold text-xs sm:text-base ${
                        plan.name === "Free Trial" 
                          ? "bg-red-500 hover:bg-red-600" 
                          : ""
                      }`}
                      onClick={() => window.location = plan.link}
                      disabled={plan.name === "Free Trial"}
                      size="sm"
                    >
                      {plan.name === "Free Trial" 
                        ? "Current Plan" 
                        : plan.price.replace("/mo", "/m")
                      }
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
      
      {/* Responsive Info Section */}
      <div className="mt-4 sm:mt-6 text-center relative">
        {/* Desktop Tooltip */}
        <div className="hidden sm:block">
          <button 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Info className="w-4 h-4 mr-1" />
            How do messages work?
          </button>
          
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg w-64 z-10">
              <p className="mb-2">Each message counts when you:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Send a message to a bot</li>
                <li>Receive a response from a bot</li>
                <li>Upload files for analysis</li>
              </ul>
              <p className="mt-2">Messages reset monthly for subscription plans</p>
            </div>
          )}
        </div>
        
        {/* Mobile Info Panel */}
        <div className="sm:hidden p-3 bg-popover text-popover-foreground text-xs rounded-lg">
          <p className="font-medium mb-1 flex items-center justify-center">
            <Info className="w-4 h-4 mr-1" />
            How messages work:
          </p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Each message sent or received counts</li>
            <li>Subscriptions reset monthly</li>
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}