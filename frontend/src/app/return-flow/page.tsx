import UploadPage from '@/app/upload/page'

export default function ReturnFlowPage() {
  return (
    <UploadPage
      productId="P001"
      productName="Cello H2O Unbreakable Water Bottle 1L"
      returnReason="Wrong Size"
      isReturnFlow={true}
    />
  )
}