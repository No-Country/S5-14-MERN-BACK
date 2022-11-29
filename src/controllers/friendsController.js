import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import Notification from "../models/Notification.js";

export const getFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }
    return res.json({ friends: user.friends });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const inviteFriend = async (req, res) => {
  const { friendId } = req.params;
  const { userID } = req;

  try {
    const newFriend = await User.findById(friendId);
    if (!newFriend) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }
    const existsRequest = await FriendRequest.findOne(
      { emmiter: userID, reciver: friendId } || { emmiter: friendId, reciver: emmiterId }
    ).select("-createdAt -updatedAt");

    if (existsRequest) {
      const error = new Error(
        existsRequest.emmiterId === userID
          ? `You already sent an invitation to ${newFriend.username}`
          : `You already have an invitation from ${newFriend.username}`
      );
      return res.status(400).json({ msg: error.message });
    }

    const user = await User.findById(userID);
    const isFriend = user.friends.filter(friend => friend.user.toString() === friendId);
    if (isFriend.length > 0) {
      const error = new Error("User is already your friend");
      return res.status(400).json({ msg: error.message });
    }

    const friendRequest = await new FriendRequest({
      emmiterId: user._id.toString(),
      reciverId: newFriend._id.toString()
    });

    newFriend.friendRequests.push(friendRequest);
    user.friendRequests.push(friendRequest);

    const notification = await new Notification({
      title: "Solicitud de amistad",
      message: `${user.username} quiere ser tu amigo`
    });

    newFriend.notifications.push(notification._id);

    await notification.save();
    await friendRequest.save();
    await newFriend.save();
    await user.save();
    return res.json({ msg: `friend ${newFriend.username} invited` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const responseInvitation = async (req, res) => {
  const { friendId } = req.params;
  const { accept } = req.body;
  const { userID } = req;

  try {
    const newFriend = await User.findById(friendId);
    if (!newFriend) {
      const error = new Error("User not found");
      return res.status(400).json({ msg: error.message });
    }
    const user = await User.findById(userID).populate("friendRequests", "-createdAt -updatedAt");
    const newRequests = user.friendRequests.filter(
      request => request.emmiterId === friendId && request.reciverId === userID
    );

    if (newRequests.length < 1) {
      const error = new Error("Friend request not exists");
      return res.status(400).json({ msg: error.message });
    }

    user.friendRequests = user.friendRequests.filter(
      request => request._id.toString() !== newRequests[0]._id.toString()
    );
    newFriend.friendRequests = newFriend.friendRequests.filter(
      request => request.toString() !== newRequests[0]._id.toString()
    );

    await FriendRequest.findByIdAndDelete(newRequests[0]._id);

    if (accept) {
      user.friends.push(friendId);
      newFriend.friends.push(userID);
      await user.save();
      await newFriend.save();
      return res.json(newFriend);
    }

    await user.save();
    await newFriend.save();
    return res.json({ msg: "Invitation refused" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteFriend = async (req, res) => {
  const { friendId } = req.params;
  const { userID } = req;

  try {
    const deletedFriend = await User.findById(friendId);
    if (!deletedFriend) {
      const error = new Error("User not exists");
      return res.status(400).json({ msg: error.message });
    }

    const user = await User.findById(userID);
    const newFriends = user.friends.filter(friend => friend.toString() !== friendId);
    if (newFriends.length === user.friends.length) {
      const error = new Error("User is not your friend");
      return res.status(400).json({ msg: error.message });
    }
    user.friends = newFriends;

    deletedFriend.friends = deletedFriend.friends.filter(
      friend => friend.toString() !== user._id.toString()
    );

    await user.save();
    await deletedFriend.save();
    return res.json({ msg: `Friend deleted` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
