
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Star, ArrowLeft, Calendar, MapPin, Users, FileText, Shield, Heart, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

// Mock data - replace with actual API call
const mockNannyData = {
  id: "N001",
  fullName: "Priya Sharma",
  gender: "Female",
  dateOfBirth: "1990-05-15",
  phone: "+91 9876543210",
  altPhone: "+91 9876543211",
  whatsappActive: true,
  languages: ["Hindi", "English", "Kannada"],
  education: "12th Grade",
  maritalStatus: "Married",
  experience: 5,
  roleType: "Full-time",
  preferredChildAge: "0-5 years",
  medicalConstraints: "None",
  specialSkills: ["Infant Care", "Basic Cooking", "Story Telling"],
  homeLocation: "Koramangala, Bangalore",
  travelWillingness: "Within 10 km",
  pastFamilies: [
    { name: "Kumar Family", phone: "+91 9876543220", childAges: "2, 4 years" },
    { name: "Mehta Family", phone: "+91 9876543221", childAges: "6 months" }
  ],
  verificationStatus: {
    aadhaar: true,
    police: true,
    references: true,
    score: 85
  },
  documents: {
    aadhaar: "https://drive.google.com/file/d/aadhaar123",
    police: "https://drive.google.com/file/d/police123",
    health: "https://drive.google.com/file/d/health123"
  },
  tags: ["Infant Care", "Night Shift", "Reliable"],
  assignedOwner: "Team Lead A",
  parentRating: 4.5,
  parentComments: "Very reliable and caring with children. Excellent communication skills.",
  currentStage: "Active",
  availability: "Available",
  lastUpdated: "2024-01-15",
  nextFollowUp: "2024-02-01",
  photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=300&fit=crop&crop=face"
};

const NannyProfile = () => {
  const { id } = useParams();
  const nanny = mockNannyData; // In real app, fetch by id

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/nannies">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to List
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Nanny Profile</h1>
            <p className="text-gray-600">ID: {nanny.id}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={nanny.photo}
                    alt={nanny.fullName}
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{nanny.fullName}</h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Gender:</strong> {nanny.gender}</p>
                      <p><strong>Date of Birth:</strong> {new Date(nanny.dateOfBirth).toLocaleDateString()}</p>
                      <p><strong>Education:</strong> {nanny.education}</p>
                      <p><strong>Marital Status:</strong> {nanny.maritalStatus}</p>
                      <p><strong>Languages:</strong> {nanny.languages.join(", ")}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
                      {nanny.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Primary Phone</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{nanny.phone}</span>
                      <Button size="sm" variant="outline" onClick={() => window.open(`tel:${nanny.phone}`, '_self')}>
                        Call
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Alternate Phone</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{nanny.altPhone}</span>
                      <Button size="sm" variant="outline" onClick={() => window.open(`tel:${nanny.altPhone}`, '_self')}>
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">WhatsApp Active:</span>
                  <div className={`w-3 h-3 rounded-full ${nanny.whatsappActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={nanny.whatsappActive ? 'text-green-700' : 'text-red-700'}>
                    {nanny.whatsappActive ? 'Yes' : 'No'}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Experience</label>
                    <p className="font-medium">{nanny.experience} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Type of Role</label>
                    <p className="font-medium">{nanny.roleType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Preferred Child Age</label>
                    <p className="font-medium">{nanny.preferredChildAge}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Current Status</label>
                    <Badge variant={nanny.availability === "Available" ? "default" : "secondary"}>
                      {nanny.availability}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-600">Special Skills</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {nanny.specialSkills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Medical Constraints</label>
                  <p className="font-medium">{nanny.medicalConstraints}</p>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location & Travel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Home Location</label>
                  <p className="font-medium">{nanny.homeLocation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Willingness to Travel</label>
                  <p className="font-medium">{nanny.travelWillingness}</p>
                </div>
              </CardContent>
            </Card>

            {/* Past Families */}
            <Card>
              <CardHeader>
                <CardTitle>Past Families & References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nanny.pastFamilies.map((family, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{family.name}</h4>
                          <p className="text-sm text-gray-600">Child Ages: {family.childAges}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => window.open(`tel:${family.phone}`, '_self')}>
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {nanny.verificationStatus.score}%
                  </div>
                  <p className="text-sm text-gray-600">Verification Score</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Aadhaar</span>
                    <Badge variant={nanny.verificationStatus.aadhaar ? "default" : "secondary"}>
                      {nanny.verificationStatus.aadhaar ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Police Verification</span>
                    <Badge variant={nanny.verificationStatus.police ? "default" : "secondary"}>
                      {nanny.verificationStatus.police ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">References</span>
                    <Badge variant={nanny.verificationStatus.references ? "default" : "secondary"}>
                      {nanny.verificationStatus.references ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={nanny.documents.aadhaar} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Aadhaar Card
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={nanny.documents.police} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Police Verification
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href={nanny.documents.health} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Health Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Parent Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Parent Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {renderStars(nanny.parentRating)}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {nanny.parentRating}/5
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-gray-600">Comments</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-lg">
                    {nanny.parentComments}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Admin Info */}
            <Card>
              <CardHeader>
                <CardTitle>Administrative Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Current Stage</label>
                  <p className="font-medium">{nanny.currentStage}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Assigned Owner</label>
                  <p className="font-medium">{nanny.assignedOwner}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Last Updated</label>
                  <p className="font-medium">{new Date(nanny.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Next Follow-up</label>
                  <p className="font-medium">{new Date(nanny.nextFollowUp).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NannyProfile;
