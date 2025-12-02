// Japanese-inspired section divider with animation
export function SectionSeparator() {
  return (
    <div className="flex items-center justify-center py-12 gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-600/50"></div>
      <div className="text-red-600 text-2xl">◆</div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-600/50"></div>
    </div>
  )
}
