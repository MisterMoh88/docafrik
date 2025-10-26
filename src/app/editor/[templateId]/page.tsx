import { EditorClient } from './EditorClient'
import { generateStaticParams } from './generateStaticParams'

export { generateStaticParams }

interface PageProps {
  params: Promise<{ templateId: string }>
}

export default function EditorPage({ params }: PageProps) {
  return <EditorClient templateId={params} />
}