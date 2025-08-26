"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Input } from "@/components/ui/input/Input"
import { Label } from "@/components/ui/label/Label"
import { Textarea } from "@/components/ui/textarea/Textarea"
import { Badge } from "@/components/ui/badge/Badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/Dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog/AlertDialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Search,
  Calendar,
  File,
  ImageIcon,
  FileSpreadsheet,
  Edit,
} from "lucide-react"
import { MonthYearSelector } from "@/components/MonthYearSelector"

// Sample document data
const sampleDocuments = [
  {
    id: 1,
    name: "Credit Card Statement - August 2025",
    description:
      "Monthly credit card statement from American Express showing all transactions and payments for August 2025",
    type: "Statement",
    fileType: "PDF",
    uploadDate: "2025-08-28",
    size: "1.8 MB",
    category: "Banking",
  },
  {
    id: 2,
    name: "Electricity Bill - August 2025",
    description: "Monthly electricity bill for home - August 2025",
    type: "Bill",
    fileType: "PDF",
    uploadDate: "2025-08-15",
    size: "245 KB",
    category: "Utilities",
  },
  {
    id: 3,
    name: "Bank Statement - August 2025",
    description: "Monthly bank statement from Chase Bank for August 2025",
    type: "Statement",
    fileType: "PDF",
    uploadDate: "2025-08-28",
    size: "1.2 MB",
    category: "Banking",
  },
  {
    id: 4,
    name: "Tax Document - W2 Form 2024",
    description: "W2 form for tax filing 2024 from employer",
    type: "Tax Document",
    fileType: "PDF",
    uploadDate: "2025-08-20",
    size: "156 KB",
    category: "Tax",
  },
  {
    id: 5,
    name: "Car Insurance Premium Receipt",
    description: "Car insurance premium payment receipt for August 2025",
    type: "Receipt",
    fileType: "Image",
    uploadDate: "2025-08-10",
    size: "890 KB",
    category: "Insurance",
  },
  {
    id: 6,
    name: "Investment Portfolio Summary Q3 2025",
    description: "Quarterly investment summary report for Q3 2025",
    type: "Report",
    fileType: "PDF",
    uploadDate: "2025-08-25",
    size: "2.1 MB",
    category: "Investment",
  },
  {
    id: 7,
    name: "Home Loan EMI Receipt",
    description: "Monthly home loan EMI payment receipt for August 2025",
    type: "Receipt",
    fileType: "PDF",
    uploadDate: "2025-08-05",
    size: "324 KB",
    category: "Banking",
  },
  {
    id: 8,
    name: "Internet Bill - August 2025",
    description: "Monthly internet service bill from Comcast",
    type: "Bill",
    fileType: "PDF",
    uploadDate: "2025-08-12",
    size: "198 KB",
    category: "Utilities",
  },
  {
    id: 9,
    name: "Health Insurance Policy Document",
    description: "Annual health insurance policy document and coverage details",
    type: "Contract",
    fileType: "PDF",
    uploadDate: "2025-08-18",
    size: "3.2 MB",
    category: "Insurance",
  },
  {
    id: 10,
    name: "Mutual Fund Statement",
    description: "Monthly mutual fund investment statement showing current holdings",
    type: "Statement",
    fileType: "PDF",
    uploadDate: "2025-08-22",
    size: "756 KB",
    category: "Investment",
  },
  {
    id: 11,
    name: "Property Tax Receipt 2025",
    description: "Annual property tax payment receipt for 2025",
    type: "Receipt",
    fileType: "Image",
    uploadDate: "2025-08-08",
    size: "1.1 MB",
    category: "Tax",
  },
  {
    id: 12,
    name: "Gas Bill - August 2025",
    description: "Monthly natural gas utility bill",
    type: "Bill",
    fileType: "PDF",
    uploadDate: "2025-08-14",
    size: "167 KB",
    category: "Utilities",
  },
]

const documentCategories = ["All", "Banking", "Bills", "Tax", "Insurance", "Investment", "Utilities", "Other"]
const documentTypes = ["Bill", "Statement", "Receipt", "Tax Document", "Report", "Contract", "Other"]

const Documents = () => {
  const [documents, setDocuments] = useState(sampleDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedMonth, setSelectedMonth] = useState(8)
  const [selectedYear, setSelectedYear] = useState(2025)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null)
  const [documentToEdit, setDocumentToEdit] = useState<any>(null)
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    type: "",
    category: "",
  })
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    type: "",
    category: "",
  })

  // Filter documents based on search and category
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory
    const docDate = new Date(doc.uploadDate)
    const matchesDate = docDate.getMonth() + 1 === selectedMonth && docDate.getFullYear() === selectedYear

    return matchesSearch && matchesCategory && matchesDate
  })

  const handleUpload = () => {
    console.log("Uploading document:", uploadForm)
    setIsUploadModalOpen(false)
    setUploadForm({ name: "", description: "", type: "", category: "" })
  }

  const handleEditClick = (doc: any) => {
    setDocumentToEdit(doc)
    setEditForm({
      name: doc.name,
      description: doc.description,
      type: doc.type,
      category: doc.category,
    })
    setIsEditModalOpen(true)
  }

  const handleEditSave = () => {
    if (documentToEdit) {
      setDocuments(documents.map((doc) => (doc.id === documentToEdit.id ? { ...doc, ...editForm } : doc)))
    }
    setIsEditModalOpen(false)
    setDocumentToEdit(null)
    setEditForm({ name: "", description: "", type: "", category: "" })
  }

  const handleDownload = (docId: number) => {
    console.log("Downloading document:", docId)
  }

  const handleDeleteClick = (docId: number) => {
    setDocumentToDelete(docId)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      setDocuments(documents.filter((doc) => doc.id !== documentToDelete))
      setDocumentToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "excel":
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Banking: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Bills: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      Tax: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Insurance: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Investment: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      Utilities: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return colors[category as keyof typeof colors] || colors.Other
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Documents</h2>
          <p className="text-muted-foreground">Manage your financial documents and files</p>
        </div>
        <div className="flex items-center gap-2">
          <MonthYearSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
          />
          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Upload a financial document with description and categorization.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Select File</Label>
                  <Input id="file" type="file" accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx" />
                </div>
                <div>
                  <Label htmlFor="name">Document Name *</Label>
                  <Input
                    id="name"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="Enter document name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Brief description of the document"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Document Type *</Label>
                  <Select
                    value={uploadForm.type}
                    onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={uploadForm.category}
                    onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentCategories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleUpload} className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Documents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getFileIcon(doc.fileType)}
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-sm font-medium break-words line-clamp-2 leading-tight">
                      {doc.name}
                    </CardTitle>
                    <CardDescription className="text-xs">{doc.size}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`text-xs flex-shrink-0 max-w-[80px] truncate ${getCategoryColor(doc.category)}`}
                >
                  {doc.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2 break-words">{doc.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 gap-2">
                <span className="flex items-center gap-1 min-w-0 flex-1">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                </span>
                <Badge variant="outline" className="text-xs flex-shrink-0 max-w-[70px] truncate">
                  {doc.type}
                </Badge>
              </div>
              <div className="space-y-2">
                {/* Main action buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent min-w-0"
                    onClick={() => handleDownload(doc.id)}
                  >
                    <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">View</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent min-w-0"
                    onClick={() => handleDownload(doc.id)}
                  >
                    <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Download</span>
                  </Button>
                </div>
                {/* Edit and Delete buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditClick(doc)}
                    className="flex-1 bg-transparent"
                  >
                    <Edit className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Edit</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteClick(doc.id)}
                    className="flex-1 bg-transparent"
                  >
                    <Trash2 className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">Delete</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedCategory !== "All"
                ? "Try adjusting your search or filter criteria"
                : "Upload your first financial document to get started"}
            </p>
            <Button onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Document Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>Update document information and details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Document Name *</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Enter document name"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Brief description of the document"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Document Type *</Label>
              <Select value={editForm.type} onValueChange={(value) => setEditForm({ ...editForm, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-category">Category *</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {documentCategories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleEditSave} className="flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this document? This action cannot be undone and the document will be
              permanently removed from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Document
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


export default Documents