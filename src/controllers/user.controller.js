import { User } from "../models/user.model.js";

export const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;
    if (!fullName || !streetAddress || !city || !state || !zipCode) {
      return res
        .status(400)
        .json({ message: "Missing required address fields" });
    }
    if (isDefault) {
      user.adresses.forEach((element) => {
        element.isDefault = false;
      });
      user.addresses.push({
        label,
        fullName,
        streetAddress,
        city,
        state,
        zipCode,
        phoneNumber,
        isDefault: isDefault || false,
      });

      await user.save();
      res.status(201).json({
        message: "Address added successfully",
        addresses: user.addresses,
      });
    }
  } catch (error) {
    console.log("Error in addAddress controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ message: user.addresses });
  } catch (error) {
    console.log("Error in getAddress controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updatedAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;
    const { id } = req.params;
    const user = req.user;
    const address = user.addresses.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (isDefault) {
      user.adresses.forEach((element) => {
        element.isDefault = false;
      });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault || address.isDefault;

    await user.save();

    res.status(200).json({
      message: "Address update successfuly",
      addresses: user.addresses,
    });
  } catch (error) {}
};
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    user.addresses.pull(id);
    await user.save();
  } catch (error) {
    console.log("Error in deleteAddress controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addWishlist = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;
    if (user.wishlist.includes(id)) {
      return res.status(400).json({
        error: "Product already in wishlist",
      });
    }
    user.wishlist.push(id);
    await user.save();

    res
      .status(200)
      .json({ message: "Product add to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.log("Error in addToWishlist controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user.wishlist.includes(id)) {
      return res
        .status(400)
        .json({ message: "Product is not found in wishlist" });
    }
    user.wishlist.pull(id);
    await user.save();
  } catch (error) {
    console.log("Error in deleteWishlist controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user_id).populate("wishlist");
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.log("Error in getWishlist controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
