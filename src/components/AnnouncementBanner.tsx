import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Typography, message } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebase";

const { Text } = Typography;

const Banner = styled(Card)`
  margin-bottom: 2rem;
  max-width: min(100%, 800px);
`;

interface AnnouncementProps {
  announcement: {
    id: string;
    title: string;
    description: string;
  };
  fetchAnnouncements: () => void;
  isAdmin: boolean;
}

const AnnouncementModal: React.FC<{
  announcement: AnnouncementProps["announcement"];
  visible: boolean;
  onClose: () => void;
}> = ({ announcement, visible, onClose }) => (
  <Modal
    title={announcement.title}
    open={visible}
    onOk={onClose}
    onCancel={onClose}
  >
    {announcement.description}
  </Modal>
);

export const AnnouncementBanner: React.FC<AnnouncementProps> = ({
  announcement,
  fetchAnnouncements,
  isAdmin,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const deleteAnnouncement = useCallback(async () => {
    try {
      await deleteDoc(doc(firestore, "announcements", announcement.id));
      fetchAnnouncements();
      message.success('Announcement deleted successfully');
    } catch (error) {
      message.error('Failed to delete announcement');
    }
  }, [announcement.id, fetchAnnouncements]);

  const isLongDescription = announcement.description.length > 100;

  return (
    <Banner
      bordered={false}
      actions={[
        isLongDescription && (
          <Button
            style={{ width: "100%", textAlign: "left" }}
            type="link"
            onClick={showModal}
          >
            View More
          </Button>
        ),
        isAdmin && (
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={deleteAnnouncement}
            danger
          />
        ),
      ]}
      title={announcement.title}
    >
      <Text>
        {isLongDescription
          ? `${announcement.description.substring(0, 100)}...`
          : announcement.description}
      </Text>
      <AnnouncementModal
        announcement={announcement}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </Banner>
  );
};
