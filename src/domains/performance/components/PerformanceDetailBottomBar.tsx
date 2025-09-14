import {
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useWishlistQuery,
} from "@/domains/favorites/queries";
import { ButtonChip } from "@/shared/components";

export function PerformanceDetailBottomBar() {
  const { data: wishlistData = [] } = useWishlistQuery();
  const addWishlistMutation = useAddWishlistMutation();
  const removeWishlistMutation = useRemoveWishlistMutation();
  return (
    <nav className="fixed flex-row bottom-0 px-5 left-0 gap-3 z-50 w-full h-[64px] rounded-t-3xl bg-gray-200 flex items-center justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.25)]">
      <ButtonChip onClick={() => {}} isActive={true}>
        보고싶어요
      </ButtonChip>
      <ButtonChip onClick={() => {}} isActive={true}>
        봤어요
      </ButtonChip>
    </nav>
  );
}
