import { ItemEditorForm } from "@/components/inventory/ItemEditorForm";
import { ItemActionsPanel } from "@/components/inventory/ItemActionsPanel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// --- MOCK DATA ---
const mockItem = {
  id: "1",
  title: "Vintage Leather Jacket",
  sku: "VLJ-001",
  purchasePrice: 45.0,
  listingPrice: 129.99,
  description:
    "A high-quality vintage leather jacket from the 80s. Excellent condition, with a classic bomber fit. All zippers and buttons are original and functional. A true collector's item.",
  images: [
    "https://placehold.co/800x800/1C1C1E/E5E5E5?text=Jacket+Front",
    "https://placehold.co/150x150/1C1C1E/E5E5E5?text=Back",
    "https://placehold.co/150x150/1C1C1E/E5E5E5?text=Label",
    "https://placehold.co/150x150/1C1C1E/E5E5E5?text=Zipper",
    "https://placehold.co/150x150/1C1C1E/E5E5E5?text=Lining",
  ],
  listedOn: ["eBay", "Poshmark"],
};

/**
 * The main page for viewing and editing a single inventory item.
 */
export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  // In a real app, you would fetch item data based on itemId
  const item = mockItem;

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div>
        <Link
          href="/inventory"
          className="text-secondary-text hover:text-primary-text mb-4 flex items-center text-sm transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Inventory
        </Link>
        <h1 className="text-primary-text truncate text-3xl font-bold tracking-tight">
          {item.title}
        </h1>
        <p className="text-secondary-text mt-1">SKU: {item.sku}</p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <ItemEditorForm item={item} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <ItemActionsPanel item={item} />
        </div>
      </div>
    </div>
  );
}
