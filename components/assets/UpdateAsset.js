import Axios from "@/lib/axios";
import AssetForm from "components/form/AssetForm";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";

const UpdateAsset = ({ open, setOpen, assets }) => {
  //   call users
  const { assetDispatch, toastDispatch } = useAppContext();
  const [asset, setAsset] = useState({
    name: assets.name,
    value: assets.value,
    user: assets.user,
    purchase_date: assets.purchase_date,
    issues: assets.issues,
  });

  // add new  organization field

  //   reset asset
  const reset = () => {
    setAsset({
      ...asset,
      name: asset.name,
      value: asset.value,
      user: asset.user,
      purchase_date: asset.purchase_date,
      issues: asset.issues,
    });
  };

  //   add asset
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`asset/${assets._id}`, {
      asset,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      assetDispatch({
        type: "UPDATE_ASSETS",
        payload: asset,
        id: assets._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });
    }
  };
  console.log(asset);
  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      {/* <ToolForm  /> */}
      <AssetForm
        handleSubmit={handleUpdate}
        asset={asset}
        setAsset={setAsset}
      />
    </FormModal>
  );
};

export default UpdateAsset;
