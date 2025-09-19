import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, MapPin, Info, Leaf, Activity, ChevronDown, Shield, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breed {
  id: string;
  name: string;
  hindiName: string;
  type: "cattle" | "buffalo";
  region: string;
  characteristics: string[];
  avgWeight: string;
  milkYield: string;
  color: string;
  nutrition: {
    dailyFeed: string;
    drymatter: string;
    protein: string;
    energy: string;
    calcium: string;
    phosphorus: string;
    foodTypes: string[];
    preferredFeed: string[];
  };
  health: {
    commonDiseases: string[];
    precautions: string[];
    medicines: {
      disease: string;
      treatment: string;
      dosage: string;
    }[];
  };
}

const breedDatabase: Breed[] = [
  {
    id: "1",
    name: "Gir",
    hindiName: "गीर",
    type: "cattle",
    region: "Gujarat, Rajasthan",
    characteristics: ["Drought resistant", "High milk yield", "Distinctive forehead"],
    avgWeight: "350-400 kg",
    milkYield: "10-15 L/day",
    color: "Light to dark red with white patches",
    nutrition: {
      dailyFeed: "12-15 kg",
      drymatter: "2.5-3% of body weight",
      protein: "12-14%",
      energy: "65-70% TDN",
      calcium: "0.6-0.8%",
      phosphorus: "0.4-0.5%",
      foodTypes: ["Green fodder", "Dry fodder", "Concentrate feed", "Mineral mixture"],
      preferredFeed: ["Berseem", "Jowar", "Maize", "Wheat straw", "Groundnut cake", "Cotton seed cake"]
    },
    health: {
      commonDiseases: ["Foot and Mouth Disease", "Mastitis", "Heat Stress", "Tick Fever"],
      precautions: ["Regular vaccination", "Clean water supply", "Shade provision", "Tick control"],
      medicines: [
        { disease: "Foot and Mouth Disease", treatment: "FMD Vaccine", dosage: "2ml subcutaneous annually" },
        { disease: "Mastitis", treatment: "Penicillin + Streptomycin", dosage: "As per vet advice" },
        { disease: "Tick Fever", treatment: "Oxytetracycline", dosage: "20mg/kg body weight" }
      ]
    }
  },
  {
    id: "2",
    name: "Sahiwal",
    hindiName: "साहीवाल",
    type: "cattle",
    region: "Punjab, Haryana",
    characteristics: ["Heat tolerant", "Good milk producer", "Docile nature"],
    avgWeight: "300-400 kg",
    milkYield: "8-12 L/day",
    color: "Light to medium brown",
    nutrition: {
      dailyFeed: "10-14 kg",
      drymatter: "2.5-3% of body weight",
      protein: "11-13%",
      energy: "65-68% TDN",
      calcium: "0.6-0.7%",
      phosphorus: "0.4-0.5%",
      foodTypes: ["Green fodder", "Dry fodder", "Concentrate feed", "Silage"],
      preferredFeed: ["Lucerne", "Shaftal", "Maize fodder", "Paddy straw", "Mustard cake", "Rice bran"]
    },
    health: {
      commonDiseases: ["Mastitis", "Pneumonia", "Diarrhea", "Bloat"],
      precautions: ["Proper ventilation", "Clean milking", "Fresh water", "Regular deworming"],
      medicines: [
        { disease: "Mastitis", treatment: "Amoxicillin", dosage: "15mg/kg twice daily" },
        { disease: "Pneumonia", treatment: "Oxytetracycline", dosage: "10mg/kg daily" },
        { disease: "Diarrhea", treatment: "ORS + Antibiotic", dosage: "As per vet prescription" }
      ]
    }
  },
  {
    id: "3",
    name: "Red Sindhi",
    hindiName: "लाल सिंधी",
    type: "cattle",
    region: "Maharashtra, Karnataka",
    characteristics: ["Heat resistant", "Good grazer", "Hardy breed"],
    avgWeight: "300-350 kg",
    milkYield: "6-10 L/day",
    color: "Dark red to light red",
    nutrition: {
      dailyFeed: "8-12 kg",
      drymatter: "2.5-3% of body weight",
      protein: "10-12%",
      energy: "60-65% TDN",
      calcium: "0.5-0.7%",
      phosphorus: "0.4-0.5%",
      foodTypes: ["Grazing", "Dry fodder", "Concentrate feed", "Tree leaves"],
      preferredFeed: ["Natural grass", "Sorghum", "Pearl millet", "Guar", "Castor cake", "Sesame cake"]
    },
    health: {
      commonDiseases: ["Heat Stress", "Parasitic Infections", "Vitamin Deficiency", "Lameness"],
      precautions: ["Shade management", "Regular deworming", "Mineral supplements", "Hoof trimming"],
      medicines: [
        { disease: "Heat Stress", treatment: "Electrolytes + Vitamin C", dosage: "50ml twice daily" },
        { disease: "Parasitic Infections", treatment: "Ivermectin", dosage: "0.2mg/kg body weight" },
        { disease: "Vitamin Deficiency", treatment: "B-Complex injection", dosage: "10ml weekly" }
      ]
    }
  },
  {
    id: "4",
    name: "Murrah",
    hindiName: "मुर्रा",
    type: "buffalo",
    region: "Haryana, Punjab, UP",
    characteristics: ["High milk yield", "Strong build", "Curved horns"],
    avgWeight: "500-600 kg",
    milkYield: "12-18 L/day",
    color: "Jet black",
    nutrition: {
      dailyFeed: "15-20 kg",
      drymatter: "3-3.5% of body weight",
      protein: "14-16%",
      energy: "70-75% TDN",
      calcium: "0.7-0.9%",
      phosphorus: "0.5-0.6%",
      foodTypes: ["Green fodder", "Dry fodder", "Concentrate feed", "Aquatic plants"],
      preferredFeed: ["Water hyacinth", "Berseem", "Jowar", "Wheat bran", "Soybean meal", "Maize"]
    },
    health: {
      commonDiseases: ["Hemorrhagic Septicemia", "Black Quarter", "Mastitis", "Reproductive Disorders"],
      precautions: ["HS vaccination", "BQ vaccination", "Clean environment", "Balanced nutrition"],
      medicines: [
        { disease: "Hemorrhagic Septicemia", treatment: "HS Vaccine", dosage: "5ml subcutaneous annually" },
        { disease: "Black Quarter", treatment: "BQ Vaccine", dosage: "5ml subcutaneous annually" },
        { disease: "Mastitis", treatment: "Ceftiofur", dosage: "1mg/kg body weight" }
      ]
    }
  },
  {
    id: "5",
    name: "Nili Ravi",
    hindiName: "नीली रावी",
    type: "buffalo",
    region: "Punjab, Haryana",
    characteristics: ["High milk yield", "Wall eyes", "White markings"],
    avgWeight: "450-550 kg",
    milkYield: "15-20 L/day",
    color: "Black with white markings",
    nutrition: {
      dailyFeed: "16-22 kg",
      drymatter: "3-3.5% of body weight",
      protein: "15-17%",
      energy: "70-75% TDN",
      calcium: "0.8-1.0%",
      phosphorus: "0.5-0.6%",
      foodTypes: ["Green fodder", "Dry fodder", "Concentrate feed", "Silage"],
      preferredFeed: ["Napier grass", "Maize silage", "Alfalfa", "Cottonseed cake", "Wheat bran", "Mineral mix"]
    },
    health: {
      commonDiseases: ["Milk Fever", "Ketosis", "Retained Placenta", "Foot Rot"],
      precautions: ["Calcium supplements", "Energy balance", "Hygiene maintenance", "Hoof care"],
      medicines: [
        { disease: "Milk Fever", treatment: "Calcium Gluconate IV", dosage: "500ml slow IV" },
        { disease: "Ketosis", treatment: "Dextrose + Vitamin B12", dosage: "500ml IV daily" },
        { disease: "Foot Rot", treatment: "Copper Sulfate", dosage: "10% solution footbath" }
      ]
    }
  },
  {
    id: "6",
    name: "Jaffarabadi",
    hindiName: "जाफराबादी",
    type: "buffalo",
    region: "Gujarat",
    characteristics: ["Large size", "Curved horns", "Good draft animal"],
    avgWeight: "600-800 kg",
    milkYield: "8-12 L/day",
    color: "Black",
    nutrition: {
      dailyFeed: "18-25 kg",
      drymatter: "2.8-3.2% of body weight",
      protein: "12-14%",
      energy: "65-70% TDN",
      calcium: "0.6-0.8%",
      phosphorus: "0.4-0.5%",
      foodTypes: ["Green fodder", "Dry fodder", "Browse", "Concentrate feed"],
      preferredFeed: ["Babul leaves", "Jowar", "Bajra", "Groundnut straw", "Coconut cake", "Salt mixture"]
    },
    health: {
      commonDiseases: ["Joint Problems", "Heat Stress", "Digestive Disorders", "Skin Diseases"],
      precautions: ["Regular exercise", "Adequate shade", "Proper feeding", "Skin hygiene"],
      medicines: [
        { disease: "Joint Problems", treatment: "Phenylbutazone", dosage: "4mg/kg body weight" },
        { disease: "Heat Stress", treatment: "Electrolyte solution", dosage: "100ml twice daily" },
        { disease: "Digestive Disorders", treatment: "Probiotics", dosage: "50g daily with feed" }
      ]
    }
  },
];

interface BreedDatabaseProps {
  className?: string;
}

export const BreedDatabase = ({ className }: BreedDatabaseProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "cattle" | "buffalo">("all");
  const [expandedNutrition, setExpandedNutrition] = useState<string[]>([]);
  const [expandedHealth, setExpandedHealth] = useState<string[]>([]);

  const filteredBreeds = breedDatabase.filter((breed) => {
    const matchesSearch = 
      breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.hindiName.includes(searchTerm) ||
      breed.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "all" || breed.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const toggleNutritionExpanded = (breedId: string) => {
    setExpandedNutrition(prev => 
      prev.includes(breedId) 
        ? prev.filter(id => id !== breedId)
        : [...prev, breedId]
    );
  };

  const toggleHealthExpanded = (breedId: string) => {
    setExpandedHealth(prev => 
      prev.includes(breedId) 
        ? prev.filter(id => id !== breedId)
        : [...prev, breedId]
    );
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Breed Database</h2>
        <p className="text-muted-foreground">नस्ल डेटाबेस - Common Indian Cattle & Buffalo Breeds</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search breeds... (English or Hindi)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 justify-center">
          {[
            { key: "all", label: "All Breeds" },
            { key: "cattle", label: "Cattle (गाय)" },
            { key: "buffalo", label: "Buffalo (भैंस)" }
          ].map(({ key, label }) => (
            <Badge
              key={key}
              variant={selectedType === key ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedType(key as typeof selectedType)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Breed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBreeds.map((breed) => (
          <Card key={breed.id} className="breed-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{breed.name}</CardTitle>
                <Badge variant={breed.type === "cattle" ? "default" : "secondary"}>
                  {breed.type === "cattle" ? "Cattle" : "Buffalo"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{breed.hindiName}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{breed.region}</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {breed.characteristics.slice(0, 2).map((char, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {char}
                    </Badge>
                  ))}
                  {breed.characteristics.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{breed.characteristics.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <p className="font-medium">{breed.avgWeight}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Milk Yield:</span>
                  <p className="font-medium">{breed.milkYield}</p>
                </div>
              </div>

              <div className="text-xs">
                <span className="text-muted-foreground">Color:</span>
                <p className="font-medium">{breed.color}</p>
              </div>

              {/* Nutrition Information */}
              <Collapsible
                open={expandedNutrition.includes(breed.id)}
                onOpenChange={() => toggleNutritionExpanded(breed.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Nutrition Requirements</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    expandedNutrition.includes(breed.id) && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs bg-muted/30 p-3 rounded-md">
                    <div>
                      <span className="text-muted-foreground">Daily Feed:</span>
                      <p className="font-medium">{breed.nutrition.dailyFeed}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Dry Matter:</span>
                      <p className="font-medium">{breed.nutrition.drymatter}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>
                      <p className="font-medium">{breed.nutrition.protein}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Energy (TDN):</span>
                      <p className="font-medium">{breed.nutrition.energy}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Calcium:</span>
                      <p className="font-medium">{breed.nutrition.calcium}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phosphorus:</span>
                      <p className="font-medium">{breed.nutrition.phosphorus}</p>
                    </div>
                  </div>

                  {/* Food Types */}
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <h5 className="text-sm font-medium text-blue-800 mb-2">Feed Categories:</h5>
                    <div className="flex flex-wrap gap-1">
                      {breed.nutrition.foodTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Feed */}
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <h5 className="text-sm font-medium text-green-800 mb-2">Recommended Feed:</h5>
                    <div className="flex flex-wrap gap-1">
                      {breed.nutrition.preferredFeed.map((feed, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-green-200 text-green-700">
                          {feed}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Health Information */}
              <Collapsible
                open={expandedHealth.includes(breed.id)}
                onOpenChange={() => toggleHealthExpanded(breed.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Health & Disease Management</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    expandedHealth.includes(breed.id) && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-3">
                  {/* Common Diseases */}
                  <div className="bg-red-50 p-3 rounded-md border border-red-100">
                    <h5 className="text-sm font-medium text-red-800 mb-2 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Common Diseases
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {breed.health.commonDiseases.map((disease, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-red-200 text-red-700">
                          {disease}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Precautions */}
                  <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                    <h5 className="text-sm font-medium text-yellow-800 mb-2 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Prevention & Precautions
                    </h5>
                    <div className="space-y-1">
                      {breed.health.precautions.map((precaution, index) => (
                        <div key={index} className="text-xs text-yellow-700 flex items-center gap-1">
                          <span className="w-1 h-1 bg-yellow-600 rounded-full"></span>
                          {precaution}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medicines */}
                  <div className="bg-green-50 p-3 rounded-md border border-green-100">
                    <h5 className="text-sm font-medium text-green-800 mb-2 flex items-center gap-1">
                      <Pill className="w-3 h-3" />
                      Treatment & Medicines
                    </h5>
                    <div className="space-y-2">
                      {breed.health.medicines.map((medicine, index) => (
                        <div key={index} className="text-xs bg-white p-2 rounded border border-green-200">
                          <div className="font-medium text-green-800">{medicine.disease}</div>
                          <div className="text-green-700 mt-1">
                            <span className="font-medium">Medicine:</span> {medicine.treatment}
                          </div>
                          <div className="text-green-600">
                            <span className="font-medium">Dosage:</span> {medicine.dosage}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                    ⚠️ Always consult a qualified veterinarian before administering any medicine
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Info className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No breeds found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div className="text-sm space-y-2">
              <p className="font-medium">About This Database</p>
              <p className="text-muted-foreground">
                This database contains information about common Indian cattle and buffalo breeds. 
                The AI model is trained to recognize these breeds from images with varying levels of accuracy.
              </p>
              <p className="text-muted-foreground">
                यह डेटाबेस भारतीय गाय और भैंस की सामान्य नस्लों की जानकारी रखता है।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};