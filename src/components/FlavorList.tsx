import { DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { firestore } from "../firebase";

const { Title } = Typography;

interface Flavor {
  id: string;
  name: string;
  description?: string;
  featured: boolean;
  outOfStock: boolean;
  hidden: boolean;
}

interface FlavorListProps {
  category: string;
  flavors: Flavor[];
  onFlavorUpdate: (flavorId: string, data: Partial<Flavor>) => void;
  onFlavorDelete: (flavorId: string) => void;
  isAdmin: boolean;
}

const FlavorList: React.FC<FlavorListProps> = ({
  category,
  flavors,
  onFlavorUpdate,
  onFlavorDelete,
  isAdmin,
}) => {
  const handleDelete = async (flavorId: string) => {
    try {
      await deleteDoc(doc(firestore, "flavors", flavorId));
      onFlavorDelete(flavorId);
      message.success("Flavor deleted successfully");
    } catch (error) {
      console.error("Error deleting flavor:", error);
      message.error("Failed to delete flavor");
    }
  };

  const handleUpdate = async (
    flavorId: string,
    field: keyof Flavor,
    value: boolean
  ) => {
    try {
      const flavorRef = doc(firestore, "flavors", flavorId);
      await updateDoc(flavorRef, { [field]: value });
      onFlavorUpdate(flavorId, { [field]: value });
      message.success("Flavor updated successfully");
    } catch (error) {
      console.error("Error updating flavor:", error);
      message.error("Failed to update flavor");
    }
  };
  return (
    <Card
      className="grid-item"
      title={category}
      headStyle={{
        fontFamily: "Zeyada, cursive",
        fontSize: "2rem",
        display: "inline-flex",
      }}
      style={{
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        width: "min(100%, 600px)",
      }}
    >
      {flavors
        .filter((flavor) => !flavor.hidden)
        .map((flavor, index) => (
          <React.Fragment key={flavor.id}>
            <div
              style={{
                background: index % 2 === 0 ? "" : "#fff",
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <Flex justify="center" align="start" vertical>
                <Title
                  level={5}
                  style={{
                    margin: 0,
                    textDecoration: flavor.outOfStock ? "line-through" : "",
                  }}
                >
                  {flavor.name}
                  {flavor.outOfStock ? (
                    <sup> OUT OF STOCK</sup>
                  ) : flavor.featured ? (
                    <sup> NEW</sup>
                  ) : (
                    ""
                  )}
                </Title>
                <p>{flavor.description}</p>
                {isAdmin && (
                  <Space wrap>
                    <Checkbox
                      checked={flavor.featured}
                      onChange={(e) =>
                        handleUpdate(flavor.id, "featured", e.target.checked)
                      }
                    >
                      Featured
                    </Checkbox>
                    <Checkbox
                      checked={flavor.outOfStock}
                      onChange={(e) =>
                        handleUpdate(flavor.id, "outOfStock", e.target.checked)
                      }
                    >
                      Out of Stock
                    </Checkbox>
                    <Checkbox
                      checked={flavor.hidden}
                      onChange={(e) =>
                        handleUpdate(flavor.id, "hidden", e.target.checked)
                      }
                    >
                      Hide
                    </Checkbox>
                    {isAdmin && (
                      <Tooltip title={"Delete flavor"}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(flavor.id)}
                          type="primary"
                          danger
                        />
                      </Tooltip>
                    )}
                  </Space>
                )}
              </Flex>
            </div>
          </React.Fragment>
        ))}
    </Card>
  );
};

export default FlavorList;
