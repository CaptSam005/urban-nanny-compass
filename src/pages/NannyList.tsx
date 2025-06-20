
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowDown, ArrowUp, Phone, Star, User, Filter, MapPin, Languages, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/Navigation";

// Enhanced mock data with languages and coordinates
const mockNannies = [
  {
    id: "N001",
    fullName: "Priya Sharma",
    area: "Koramangala",
    experience: 5,
    availability: "Available",
    photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    phone: "+91 9876543210",
    rating: 4.5,
    tags: ["Infant Care", "Night Shift"],
    roleType: "Full-time",
    verificationScore: 85,
    languages: ["Hindi", "English", "Kannada"],
    coordinates: { lat: 12.9352, lng: 77.6245 }, // Koramangala coords
    distance: 2.3
  },
  {
    id: "N002", 
    fullName: "Anita Devi",
    area: "Whitefield",
    experience: 8,
    availability: "Busy",
    photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
    phone: "+91 9876543211",
    rating: 4.8,
    tags: ["Toddler Care", "Cooking"],
    roleType: "Part-time",
    verificationScore: 92,
    languages: ["Hindi", "English", "Bengali", "Telugu"],
    coordinates: { lat: 12.9698, lng: 77.7499 }, // Whitefield coords
    distance: 8.7
  },
  {
    id: "N003",
    fullName: "Sunita Reddy", 
    area: "HSR Layout",
    experience: 3,
    availability: "Available",
    photo: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&h=150&fit=crop&crop=face",
    phone: "+91 9876543212",
    rating: 4.2,
    tags: ["Housekeeping", "Flexible Hours"],
    roleType: "Full-time",
    verificationScore: 78,
    languages: ["Telugu", "English", "Tamil"],
    coordinates: { lat: 12.9116, lng: 77.6473 }, // HSR Layout coords
    distance: 4.1
  },
  {
    id: "N004",
    fullName: "Lakshmi Nair",
    area: "Indiranagar",
    experience: 6,
    availability: "Available",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    phone: "+91 9876543213",
    rating: 4.6,
    tags: ["Night Care", "Special Needs"],
    roleType: "Live-in",
    verificationScore: 88,
    languages: ["Malayalam", "English", "Hindi", "Kannada", "Tamil"],
    coordinates: { lat: 12.9716, lng: 77.6412 }, // Indiranagar coords
    distance: 1.8
  }
];

const allLanguages = Array.from(new Set(mockNannies.flatMap(nanny => nanny.languages))).sort();

const NannyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState([20]); // Default 20km
  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language) 
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const filteredNannies = mockNannies
    .filter(nanny => {
      const matchesSearch = nanny.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nanny.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nanny.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || nanny.roleType === filterRole;
      const matchesAvailability = filterAvailability === "all" || nanny.availability === filterAvailability;
      const matchesLanguages = selectedLanguages.length === 0 || 
                              selectedLanguages.every(lang => nanny.languages.includes(lang));
      const matchesDistance = nanny.distance <= maxDistance[0];
      
      return matchesSearch && matchesRole && matchesAvailability && matchesLanguages && matchesDistance;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case "experience":
          aValue = a.experience;
          bValue = b.experience;
          break;
        case "rating":
          aValue = a.rating;
          bValue = b.rating;
          break;
        case "distance":
          aValue = a.distance;
          bValue = b.distance;
          break;
        default:
          aValue = a.fullName;
          bValue = b.fullName;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const renderLanguageBadges = (languages: string[]) => {
    const displayLanguages = languages.slice(0, 3);
    const remainingCount = languages.length - 3;

    return (
      <div className="flex flex-wrap gap-1">
        {displayLanguages.map((language) => (
          <Badge key={language} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            <Languages className="w-3 h-3 mr-1" />
            {language}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
            +{remainingCount} more
          </Badge>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nanny Database</h1>
          <p className="text-gray-600">Manage and track all registered nannies</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, area, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white rounded-lg border">
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Live-in">Live-in</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Language Filter */}
              <Popover open={languageFilterOpen} onOpenChange={setLanguageFilterOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={languageFilterOpen}
                    className="justify-between"
                  >
                    {selectedLanguages.length > 0
                      ? `${selectedLanguages.length} selected`
                      : "Languages"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search languages..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {allLanguages.map((language) => (
                          <CommandItem
                            key={language}
                            value={language}
                            onSelect={() => toggleLanguage(language)}
                          >
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={selectedLanguages.includes(language)}
                                onChange={() => toggleLanguage(language)}
                              />
                              <span>{language}</span>
                            </div>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedLanguages.includes(language) ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Distance Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Distance: {maxDistance[0]}km</label>
                <Slider
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                  max={20}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                  <SelectItem value="experience-desc">Experience (High-Low)</SelectItem>
                  <SelectItem value="experience-asc">Experience (Low-High)</SelectItem>
                  <SelectItem value="rating-desc">Rating (High-Low)</SelectItem>
                  <SelectItem value="distance-asc">Distance (Nearest)</SelectItem>
                  <SelectItem value="distance-desc">Distance (Farthest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {(selectedLanguages.length > 0 || maxDistance[0] < 20) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedLanguages.map((language) => (
              <Badge key={language} variant="secondary" className="px-2 py-1">
                {language}
                <button
                  onClick={() => toggleLanguage(language)}
                  className="ml-1 text-xs hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            ))}
            {maxDistance[0] < 20 && (
              <Badge variant="secondary" className="px-2 py-1">
                Within {maxDistance[0]}km
                <button
                  onClick={() => setMaxDistance([20])}
                  className="ml-1 text-xs hover:text-red-600"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredNannies.length} of {mockNannies.length} nannies
          </p>
        </div>

        {/* Nanny Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNannies.map((nanny) => (
            <Card key={nanny.id} className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <Link to={`/nanny/${nanny.id}`}>
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={nanny.photo}
                      alt={nanny.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{nanny.fullName}</h3>
                      <p className="text-gray-600 text-sm">ID: {nanny.id}</p>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{nanny.area} • {nanny.distance}km away</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Experience</span>
                      <span className="font-medium">{nanny.experience} years</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge variant={nanny.availability === "Available" ? "default" : "secondary"}>
                        {nanny.availability}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{nanny.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Languages Section */}
                  <div className="mb-4">
                    <span className="text-sm text-gray-600 block mb-2">Languages</span>
                    {renderLanguageBadges(nanny.languages)}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {nanny.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`tel:${nanny.phone}`, '_self');
                      }}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {filteredNannies.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No nannies found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NannyList;
