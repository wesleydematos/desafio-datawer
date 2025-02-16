export interface EditProfessionalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedQualification: string) => void;
  isLoading?: boolean;
  professionalName?: string;
  currentQualification?: string;
}
