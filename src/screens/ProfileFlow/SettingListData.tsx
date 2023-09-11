const ProfileImage = require('../../assets/ProfileImage.png');
const emojiIcon = require('../../assets/ProfileFlowIcons/emoji.png');
const LockIcon = require('../../assets/ProfileFlowIcons/LockIcon.png');
const HomeIcon = require('../../assets/ProfileFlowIcons/HomeIcon.png');
const CardIcon = require('../../assets/ProfileFlowIcons/CardIcon.png');
const SunIcon = require('../../assets/ProfileFlowIcons/SunIcon.png');
const LogoIcon = require('../../assets/ProfileFlowIcons/logoIcon.png');
const QuestionIcon = require('../../assets/ProfileFlowIcons/QuestionIcon.png');
const BellIcon = require('../../assets/ProfileFlowIcons/BellIcon.png');
const CameraIcon = require('../../assets/ProfileFlowIcons/CameraIcon.png');
const messageIcon = require('../../assets/message.png');
const TempPhoto = require('../../assets/temporaryLIstImage.png');
const AddCameraIcon = require('../../assets/CameraIcon.png');
const GalleryIcon = require('../../assets/GalleryIcon.png');
const VideoIcon = require('../../assets/VideoIcons.png');
const NextIcon = require('../../assets/NextIcon.png');
const shareIcon = require('../../assets/share_Icon.png');
const EyeShowIcon = require('../../assets/IconPasswordShow.png');
const EyeOffShowIcon = require('../../assets/IconOffPasswordShow.png');
const DeleteIcon = require('../../assets/delete_Icon.png');
const message_Icon = require('../../assets/message_Icon.png');
const EditphotoIcon = require('../../assets/EditPhotoIcon.png');
const ChooseVideo = require('../../assets/ChooseVideo.png');

const AddPhotoOptionList = [
  {
    icon: AddCameraIcon,
    name: 'Take photo',
  },
  {
    icon: VideoIcon,
    name: 'Take a video',
  },
  {
    icon: GalleryIcon,
    name: 'Add photo from library',
  },
  {
    icon: ChooseVideo,
    name: 'Add video from library',
  },
];
const AddPhotoMenuList = [
  {
    icon: message_Icon,
    name: 'Send in Kazzah chat',
    leftIcon: NextIcon,
  },
  {
    icon: shareIcon,
    name: 'Share',
    leftIcon: NextIcon,
  },
  {
    icon: EyeShowIcon,
    name: 'Set this photo as',
    leftIcon: NextIcon,
  },
  {
    icon: EditphotoIcon,
    name: 'Edit team and description',
    leftIcon: NextIcon,
  },
  {
    icon: DeleteIcon,
    name: 'Delete',
    leftIcon: NextIcon,
  },
];
const AddPhotoMenuListSearch = [
  {
    icon: message_Icon,
    name: 'Send in Kazzah chat',
    leftIcon: NextIcon,
  },
  {
    icon: shareIcon,
    name: 'Share',
    leftIcon: NextIcon,
  },
];
const ProfileSetting = [
  {
    icon: emojiIcon,
    name: 'Profile',
    description: 'Manage your important details',
  },
  {
    icon: LockIcon,
    name: 'Password',
    description: 'Manage your access',
  },
  {
    icon: HomeIcon,
    name: 'Address',
    description: 'For those services that get done at your home',
  },
  {
    icon: CardIcon,
    name: 'Credit card',
    description: 'Manage how you pay your pros',
  },
  {
    icon: CameraIcon,
    name: 'Photos',
    description: 'Manage your content ',
  },
  {
    icon: SunIcon,
    name: 'Display',
    description: 'Manage display settings',
  },
  {
    icon: BellIcon,
    name: 'Notifications',
    description: 'Manage how we update you',
  },
  {
    icon: QuestionIcon,
    name: 'FAQ',
    description: 'Resources on common questions',
  },
  {
    icon: LogoIcon,
    name: 'About Kazzah',
    description: 'More Information ',
  },
];
const ProviderListData = [
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
  {
    profileImage: ProfileImage,
    firstName: 'Amy',
    lastName: 'Fisher',
    rootService: 'Attorney',
  },
];
const NotificationListData = [
  {
    icon: messageIcon,
    name: 'Invitation',
  },
  {
    icon: messageIcon,
    name: 'Service',
  },
  {
    icon: messageIcon,
    name: 'Push',
  },
  {
    icon: messageIcon,
    name: 'Push',
  },
  {
    icon: messageIcon,
    name: 'Push',
  },
];
const PhotoListCardData = [
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
  {
    url: TempPhoto,
  },
];

export {
  ProfileImage,
  emojiIcon,
  LockIcon,
  HomeIcon,
  CardIcon,
  SunIcon,
  LogoIcon,
  QuestionIcon,
  BellIcon,
  CameraIcon,
  ProfileSetting,
  NotificationListData,
  PhotoListCardData,
  AddPhotoOptionList,
  AddPhotoMenuList,
  ProviderListData,
  AddPhotoMenuListSearch,
  NextIcon,
  EyeOffShowIcon,
};
