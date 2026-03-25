import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { 
  ArrowRight, ArrowLeft, Heart, Sparkles, Wand2, 
  Eye, Smile, User, MessageCircle, Play, Lock, Crown,
  Check, ChevronRight, Palette, Gem, Music, Camera, Star,
  Droplets, Sun, Moon, Flame, Snowflake, Wind
} from "lucide-react";

// Import images
import girl1 from "../assets/girls/1.png";
import girl2 from "../assets/girls/2.png";
import girl3 from "../assets/girls/3.png";
import girl4 from "../assets/girls/4.png";
import girl5 from "../assets/girls/5.png";

import africanEthnicity from '../assets/create/ethnicity/african.png';
import asianEthnicity from '../assets/create/ethnicity/asian.png';
import europeanEthnicity from '../assets/create/ethnicity/european.png';
import latinaEthnicity from '../assets/create/ethnicity/latina.png';
import arabicEthnicity from '../assets/create/ethnicity/arabic.png';

import brownHair from '../assets/create/hair/brown.png';
import blondeHair from '../assets/create/hair/blonde.png';
import redHair from '../assets/create/hair/redhair.png';
import blackHair from '../assets/create/hair/black.png';
import pinkHair from '../assets/create/hair/pink.png';
import silverHair from '../assets/create/hair/silver.png';

import hazelEyes from '../assets/create/eyes/hazel.png'
import blueEyes from '../assets/create/eyes/blue.png'
import greenEyes from '../assets/create/eyes/green.png'
import brownEyes from '../assets/create/eyes/brown.png'
import purpleEyes from '../assets/create/eyes/purple.png'
import blackEyes from '../assets/create/eyes/black.png'

import athleticBody from '../assets/create/body/athletic.png';
import curvyBody from '../assets/create/body/curvy.png';
import petiteBody from '../assets/create/body/petite.png';
import slimBody from '../assets/create/body/slim.png';
import thickBody from '../assets/create/body/thick.png';


const steps = [
  { id: 1, title: "Hair", icon: Sparkles },
  { id: 2, title: "Eyes", icon: Eye },
  { id: 3, title: "Body", icon: User },
  { id: 4, title: "Ethnicity", icon: Gem },
  { id: 5, title: "Info", icon: User },
  { id: 6, title: "Personality", icon: Smile },
  { id: 7, title: "Actions", icon: Play },
  { id: 8, title: "Preview", icon: Sparkles },
];


const hairColors = [
  { value: "brunette", label: "Brunette", image: brownHair },
  { value: "blonde", label: "Blonde", image: blondeHair },
  { value: "redhead", label: "Redhead", image: redHair },
  { value: "black", label: "Black", image: blackHair },
  { value: "pink", label: "Pink", image: pinkHair },
  { value: "silver", label: "Silver", image: silverHair },
];

const eyeColors = [
  { value: "blue", label: "Blue", image: blueEyes },
  { value: "green", label: "Green", image: greenEyes },
  { value: "brown", label: "Brown", image: brownEyes },
  { value: "hazel", label: "Hazel", image: hazelEyes },
  { value: "purple", label: "Purple", image: purpleEyes },
  { value: "black", label: "Black", image: blackEyes },
];

const bodyTypes = [
  { value: "slim", label: "Slim & Toned", image: slimBody },
  { value: "curvy", label: "Curvy & Sexy", image: curvyBody },
  { value: "athletic", label: "Athletic", image: athleticBody },
  { value: "petite", label: "Petite & Cute", image: petiteBody },
  { value: "thick", label: "Thick & Juicy", image: thickBody },
];

const ethnicities = [
  { value: "asian", label: "Asian", image: asianEthnicity },
  { value: "latina", label: "Latina", image: latinaEthnicity },
  { value: "european", label: "European", image: europeanEthnicity },
  { value: "african", label: "African", image: africanEthnicity },
  { value: "arabic", label: "Middle Eastern", image: arabicEthnicity },

];

const personalityTags = [
  { value: "playful", label: "Playful" },
  { value: "flirty", label: "Flirty" },
  { value: "sensual", label: "Sensual" },
  { value: "shy", label: "Shy" },
  { value: "dominant", label: "Dominant" },
  { value: "innocent", label: "Innocent" },
  { value: "adventurous", label: "Adventurous" },
  { value: "teasing", label: "Teasing" },
];

const availableActions = [
  { id: 1, label: "Open Mouth", messagesNeeded: 0, premium: false },
  { id: 2, label: "Shake Hand", messagesNeeded: 2, premium: false },
  { id: 3, label: "Lick", messagesNeeded: 4, premium: false },
  { id: 4, label: "Touch", messagesNeeded: 6, premium: false },
  { id: 5, label: "Stroke", messagesNeeded: 8, premium: true },
  { id: 6, label: "Cum", messagesNeeded: 10, premium: false },
  { id: 7, label: "Spank", messagesNeeded: 12, premium: false },
  { id: 8, label: "Deep Throat", messagesNeeded: 15, premium: false },
  { id: 9, label: "Ride", messagesNeeded: 18, premium: true },
  { id: 10, label: "Anal", messagesNeeded: 20, premium: true },
];

// Image Tile Component
function ImageTile({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-3xl aspect-[3/4] transition-all duration-500
        border-2 ${isSelected ? 'border-[#741818]' : 'border-transparent opacity-60 hover:opacity-100'}
      `}
    >
      <img 
        src={item.image} 
        alt={item.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0a0a0f] to-transparent">
        <span className="text-white font-bold text-sm tracking-tight">{item.label}</span>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-[#741818] rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}
    </button>
  );
}

// Age Slider Component
function AgeSlider({ value, onChange }) {
  return (
    <div className="w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Target Age</span>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold text-white tracking-tighter">{value}</span>
          <span className="text-white/20 text-xs font-medium">years</span>
        </div>
      </div>
      
      <div className="relative h-2 bg-white/5 rounded-full">
        <div 
          className="absolute inset-y-0 left-0 bg-[#741818] rounded-full"
          style={{ width: `${((value - 18) / (35 - 18)) * 100}%` }}
        />
        <input
          type="range"
          min={18}
          max={35}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between mt-4 text-[10px] font-bold text-white/10 tracking-widest uppercase">
        <span>18</span>
        <span>35</span>
      </div>
    </div>
  );
}

export default function CreateGirlPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: 22,
    bio: "",
    hairColor: "",
    eyeColor: "",
    bodyType: "",
    ethnicity: "",
    tags: [],
    mood: "",
    initialMessage: "",
    actions: [],
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const toggleAction = (actionId) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.includes(actionId)
        ? prev.actions.filter(id => id !== actionId)
        : [...prev.actions, actionId]
    }));
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return formData.hairColor;
      case 2: return formData.eyeColor;
      case 3: return formData.bodyType;
      case 5: return formData.name && formData.age && formData.bio;
      case 6: return formData.tags.length > 0 && formData.initialMessage;
      case 7: return formData.actions.length > 0;
      default: return true;
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Hair Aesthetics</h2>
              <p className="text-white/30 mt-2 font-medium">Select the signature style for your companion.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {hairColors.map((color) => (
                <ImageTile
                  key={color.value}
                  item={color}
                  isSelected={formData.hairColor === color.value}
                  onClick={() => updateFormData("hairColor", color.value)}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Ocular Hue</h2>
              <p className="text-white/30 mt-2 font-medium">Choose the depth and color of her gaze.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {eyeColors.map((color) => (
                <ImageTile
                  key={color.value}
                  item={color}
                  isSelected={formData.eyeColor === color.value}
                  onClick={() => updateFormData("eyeColor", color.value)}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Physique Type</h2>
              <p className="text-white/30 mt-2 font-medium">Define the silhouette of your perfect match.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {bodyTypes.map((type) => (
                <ImageTile
                  key={type.value}
                  item={type}
                  isSelected={formData.bodyType === type.value}
                  onClick={() => updateFormData("bodyType", type.value)}
                />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Ethnicity</h2>
              <p className="text-white/30 mt-2 font-medium">Optionally define her heritage and background.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {ethnicities.map((eth) => (
                <ImageTile
                  key={eth.value}
                  item={eth}
                  isSelected={formData.ethnicity === eth.value}
                  onClick={() => updateFormData("ethnicity", eth.value)}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="w-full py-6 text-white/30 hover:text-white uppercase text-[10px] font-bold tracking-[0.2em] transition-all"
            >
              Skip this discovery
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Identity</h2>
              <p className="text-white/30 mt-2 font-medium">Provide a name and a narrative for her essence.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Designation</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="Enter her name..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all text-xl font-bold tracking-tight"
                />
              </div>

              <AgeSlider
                value={formData.age}
                onChange={(value) => updateFormData("age", value)}
              />

              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Narrative</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="What is her story?"
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all resize-none leading-relaxed font-medium"
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Personality</h2>
              <p className="text-white/30 mt-2 font-medium">Fine-tune her behavior and initial reception.</p>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Core Traits</label>
                <div className="flex flex-wrap gap-3">
                  {personalityTags.map((tag) => (
                    <button
                      key={tag.value}
                      onClick={() => toggleTag(tag.value)}
                      className={`px-6 py-3.5 rounded-2xl font-bold text-xs tracking-tight transition-all border ${
                        formData.tags.includes(tag.value)
                          ? 'bg-[#741818] border-[#741818] text-white'
                          : 'bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/10'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest block ml-1">Opening Reception</label>
                <textarea
                  value={formData.initialMessage}
                  onChange={(e) => updateFormData("initialMessage", e.target.value)}
                  placeholder="The first words she will speak..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-[#741818] transition-all resize-none leading-relaxed font-medium"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Capabilities</h2>
              <p className="text-white/30 mt-2 font-medium">Define the interactive depth of her existence.</p>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => toggleAction(action.id)}
                  className={`w-full p-5 rounded-2xl border transition-all flex items-center justify-between ${
                    formData.actions.includes(action.id)
                      ? 'bg-[#741818] border-[#741818] text-white'
                      : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      formData.actions.includes(action.id)
                        ? 'bg-white border-white text-[#741818]'
                        : 'bg-transparent border-white/10 text-transparent'
                    }`}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="font-bold tracking-tight text-sm">{action.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{action.messagesNeeded} XP</span>
                    {action.premium && <Crown size={14} className="text-yellow-500" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white tracking-tighter">Synthesis Complete</h2>
              <p className="text-white/30 mt-2 font-medium">Review the essence of your creation.</p>
            </div>

            <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                  <User className="w-10 h-10 text-white/20" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white tracking-tighter">{formData.name || "Nameless Essence"}</h3>
                  <p className="text-white/40 font-bold text-xs uppercase tracking-widest mt-1">{formData.age} Years Old • {formData.ethnicity || "Unknown origin"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Visual", val: formData.hairColor },
                  { label: "Gaze", val: formData.eyeColor },
                  { label: "Physique", val: formData.bodyType }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">{stat.label}</span>
                    <p className="text-white font-bold tracking-tight capitalize">{stat.val || "—"}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 italic text-white/70 leading-relaxed font-medium">
                  "{formData.bio || "Her story remains unwritten..."}"
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-[#741818]/20 border border-[#741818]/20 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#0a0a0f] py-12 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          {/* Progress Tracker - Modern Glass */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/5 p-4 rounded-[2.5rem] mb-12 overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-max px-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                      ${currentStep === step.id 
                        ? 'bg-[#741818] text-white' 
                        : currentStep > step.id 
                          ? 'bg-white/10 text-white' 
                          : 'bg-white/5 text-white/20'}
                    `}>
                      <step.icon size={18} strokeWidth={currentStep === step.id ? 2.5 : 2} />
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-px mx-4 ${currentStep > step.id ? 'bg-[#741818]' : 'bg-white/5'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content Area */}
          <div className="bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 md:p-14 border border-white/5 relative overflow-hidden mb-10">
            {/* Subtle light effect inside */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#741818]/5 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              {renderStep()}
            </div>
          </div>

          {/* Nav Buttons */}
          <div className="flex justify-between items-center bg-white/5 p-3 rounded-[2.5rem] border border-white/5">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${
                currentStep === 1 
                  ? 'text-white/10 cursor-not-allowed opacity-50' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeft size={20} strokeWidth={3} />
              Return
            </button>

            {currentStep < 8 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold transition-all ${
                  canProceed()
                    ? 'bg-[#741818] text-white hover:bg-[#8d1d1d] active:scale-95'
                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                }`}
              >
                Continue
                <ArrowRight size={20} strokeWidth={3} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/collection')}
                className="flex items-center gap-3 px-12 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95"
              >
                Synthesize Soul
                <Heart size={20} fill="currentColor" />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Layout>
  );
}
