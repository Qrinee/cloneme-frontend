import { useState } from "react";
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
  { value: "playful", label: "Playful", color: "from-pink-500 to-rose-500" },
  { value: "flirty", label: "Flirty", color: "from-red-500 to-orange-500" },
  { value: "sensual", label: "Sensual", color: "from-purple-500 to-pink-500" },
  { value: "shy", label: "Shy", color: "from-blue-500 to-cyan-500" },
  { value: "dominant", label: "Dominant", color: "from-red-600 to-red-800" },
  { value: "innocent", label: "Innocent", color: "from-white to-gray-300" },
  { value: "adventurous", label: "Adventurous", color: "from-yellow-500 to-orange-500" },
  { value: "teasing", label: "Teasing", color: "from-pink-400 to-red-400" },
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
        relative overflow-hidden rounded-2xl aspect-square transition-all duration-300
        hover:scale-105 hover:shadow-xl hover:shadow-rose-500/20
        ${isSelected ? 'ring-4 ring-rose-500 ring-offset-4 ring-offset-gray-900 scale-105' : 'opacity-80 hover:opacity-100'}
      `}
    >
      <img 
        src={item.image} 
        alt={item.label}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center">
        <span className="text-white font-bold text-lg drop-shadow-lg">{item.label}</span>
      </div>

      {isSelected && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}
    </button>
  );
}

// Age Slider Component
function AgeSlider({ value, onChange }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-white/50 text-sm">Age</span>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-white/50">years</span>
        </div>
      </div>
      
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-red-700 rounded-full transition-all"
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
      
      <div className="flex justify-between mt-2 text-xs text-white/30">
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
    // Basic Info
    name: "",
    age: 22,
    bio: "",
    // Appearance
    hairColor: "",
    eyeColor: "",
    bodyType: "",
    ethnicity: "",
    // Personality
    tags: [],
    mood: "",
    personality: "",
    initialMessage: "",
    // Actions
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
      case 4: return true; // ethnicity is optional
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
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">

              <h2 className="text-3xl font-bold text-white">Hair Color</h2>
              <p className="text-white/50 mt-2">Choose her hair color</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">Eye Color</h2>
              <p className="text-white/50 mt-2">What color are her eyes?</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Body Type</h2>
              <p className="text-white/50 mt-2">Choose her figure</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <Gem className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Ethnicity</h2>
              <p className="text-white/50 mt-2">Optional - choose her background</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
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
              onClick={() => updateFormData("ethnicity", "")}
              className="w-full py-3 text-white/40 hover:text-white/60 transition-colors text-sm"
            >
              Skip this step
            </button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-rose-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Basic Info</h2>
              <p className="text-white/50 mt-2">Give her a name and story</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-white/70 text-sm font-medium mb-2 block">Her Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  placeholder="e.g., Sophia, Emma, Luna..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500 text-lg"
                />
              </div>

              <AgeSlider
                value={formData.age}
                onChange={(value) => updateFormData("age", value)}
              />

              <div>
                <label className="text-white/70 text-sm font-medium mb-2 block">Her Story</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                  placeholder="Describe her personality, background, what makes her unique..."
                  rows={4}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
                <p className="text-white/30 text-xs mt-2">Write something that will make users fall in love with her</p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <Smile className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Personality</h2>
              <p className="text-white/50 mt-2">How should she behave?</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-white/70 text-sm font-medium mb-3 block">Choose her traits ✨</label>
                <div className="flex flex-wrap gap-3">
                  {personalityTags.map((tag) => (
                    <button
                      key={tag.value}
                      onClick={() => toggleTag(tag.value)}
                      className={`px-5 py-3 rounded-full font-medium transition-all ${
                        formData.tags.includes(tag.value)
                          ? `bg-gradient-to-r ${tag.color} text-white`
                          : 'bg-gray-800/50 text-white/50 hover:bg-gray-700/50'
                      }`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-white/70 text-sm font-medium mb-2 block">Current Mood 💭</label>
                <input
                  type="text"
                  value={formData.mood}
                  onChange={(e) => updateFormData("mood", e.target.value)}
                  placeholder="e.g., Ready for you, Waiting impatiently..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm font-medium mb-2 block">Her Opening Message 💬</label>
                <textarea
                  value={formData.initialMessage}
                  onChange={(e) => updateFormData("initialMessage", e.target.value)}
                  placeholder="The first thing she'll say when a user starts chatting..."
                  rows={3}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
                <p className="text-white/30 text-xs mt-2">Make it flirty and inviting!</p>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <Play className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Actions she can do</h2>
              <p className="text-white/50 mt-2">Select what users can interact with</p>
            </div>

            <div className="space-y-3">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => toggleAction(action.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    formData.actions.includes(action.id)
                      ? 'border-rose-500 bg-rose-500/20'
                      : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      formData.actions.includes(action.id)
                        ? 'bg-rose-500'
                        : 'bg-gray-700'
                    }`}>
                      {formData.actions.includes(action.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-white font-medium">{action.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white/40 text-sm">{action.messagesNeeded} msgs</span>
                    {action.premium && (
                      <span className="flex items-center gap-1 text-yellow-400 text-xs">
                        <Crown className="w-3 h-3" />
                        Premium
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <Sparkles className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Ready to create!</h2>
              <p className="text-white/50 mt-2">Here's your girl preview</p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-violet-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{formData.name || "Your Girl"}</h3>
                  <p className="text-white/50">{formData.age} years old</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                {formData.hairColor && (
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <span className="text-white/50 text-xs">Hair</span>
                    <p className="text-white text-sm capitalize">{formData.hairColor}</p>
                  </div>
                )}
                {formData.eyeColor && (
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <span className="text-white/50 text-xs">Eyes</span>
                    <p className="text-white text-sm capitalize">{formData.eyeColor}</p>
                  </div>
                )}
                {formData.bodyType && (
                  <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                    <span className="text-white/50 text-xs">Body</span>
                    <p className="text-white text-sm capitalize">{formData.bodyType}</p>
                  </div>
                )}
              </div>
              
              <p className="text-white/70 mb-4 italic">"{formData.bio}"</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-700/50 rounded-full text-white/70 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mt-4">
                <p className="text-white/40 text-sm mb-2">First message:</p>
                <p className="text-white">{formData.initialMessage}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/40 text-sm">This will generate AI videos based on your description</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-fit">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all
                    ${currentStep >= step.id 
                      ? 'bg-gradient-to-r from-rose-500 to-violet-500 text-white' 
                      : 'bg-gray-800 text-white/40'}
                  `}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs mt-2 ${currentStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${currentStep > step.id ? 'bg-rose-500' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-800">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                currentStep === 1 
                  ? 'text-white/30 cursor-not-allowed' 
                  : 'text-white bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 8 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all ${
                  canProceed()
                    ? 'bg-red-700 text-white hover:scale-105'
                    : 'bg-gray-800 text-white/40 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => console.log("Create girl:", formData)}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-medium bg-red-700 text-white hover:scale-105 transition-all"
              >
                <Heart className="w-5 h-5" />
                Create Girl
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
