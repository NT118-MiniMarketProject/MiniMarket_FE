import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { RootStackParamList } from "../../utils/types";
import {
  ImageLibraryOptions,
  MediaType,
  launchImageLibrary,
} from "react-native-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// type AddProductFormRouteProp = RouteProp<RootStackParamList, 'AddProductForm'>;
// type AddProductFormNavigationProp = StackNavigationProp<RootStackParamList, 'AddProductForm'>;

// export interface AddProductFormProps {
//   route: AddProductFormRouteProp;
//   navigation: AddProductFormNavigationProp;
// }

interface Product {
  product_id: string;
  thumbnail: string;
  name: string;
  reg_price: number;
  discount_percent: number | null;
  quantity: number | null;
  unit: string;
  description: string | null;
  c_id: string;
  br_id: string;
  is_visible: boolean | null;
  is_feature: boolean | null;
}

const AddProductForm: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const selectImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo" as MediaType,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        // setImageUri(response?.assets[0].uri);
      }
    });

    const uploadImage = async () => {
      if (!imageUri) {
        return;
      }
      setUploading(true);
      setUploadStatus("");

      const formData = new FormData();
      const file = {
        uri: imageUri,
        type: "image/jpeg",
        name: "photo.jpg",
      };
      formData.append("image", file as any);

      try {
        const response = await axios.post("YOUR_SERVER_UPLOAD_URL", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadStatus("Upload successful!");
      } catch (error) {
        console.error(error);
        setUploadStatus("Upload failed!");
      } finally {
        setUploading(false);
      }
    };
  };

  const { product } = (route?.params as any) ?? {};
  const [product1, setProduct1] = useState<Product>({
    product_id: product.product_id,
    thumbnail: product.thumbnail,
    discount_percent: product.discount_percent,
    name: product.name,
    reg_price: product.reg_price,
    quantity: product.quantity,
    unit: product.unit,
    description: product.description,
    c_id: product.c_id,
    br_id: product.br_id,
    is_visible: product.is_visible,
    is_feature: product.is_feature,
  });
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://minimarket-be.onrender.com/api/v1/brand"
        );
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://minimarket-be.onrender.com/api/v1/category"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    field: keyof Product,
    value: string | number | boolean | null
  ) => {
    setProduct1({ ...product1, [field]: value });
  };

  const updateProduct = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.put(
        `https://minimarket-be.onrender.com/api/v1/product/${product1.product_id}`,
        product1,
        config
      );
      console.log("Product updated successfully:", response.data);
      alert("Cập nhật sản phẩm thành công");
      navigation.navigate("ProductListAdScreen" as any);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Cập nhật sản phẩm thất bại");
    }
  };

  const handleSubmit = () => {
    updateProduct();
  };
  return (
    <View style={{ flex: 1 }} className="mt-10">
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.header}>Thông tin sản phẩm</Text>

          <View style={styles.formContainer}>
            <Image
              source={{ uri: product1.thumbnail }}
              className="w-16 h-16 mr-2"
            />
            <Text style={styles.formLabel}>Tên sản phẩm</Text>
            <TextInput
              style={styles.input}
              value={product1.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Tên sản phẩm"
            />

            <Text style={styles.formLabel}>Giá sản phẩm (VNĐ)</Text>
            <TextInput
              style={styles.input}
              value={product1.reg_price.toString()}
              onChangeText={(text) =>
                handleChange("reg_price", parseInt(text) || 0)
              }
              placeholder="Giá sản phẩm"
              keyboardType="numeric"
            />

            <Text style={styles.formLabel}>Số lượng</Text>
            <TextInput
              style={styles.input}
              value={product1.quantity?.toString() || ""}
              onChangeText={(text) =>
                handleChange("quantity", parseInt(text) || 0)
              }
              placeholder="Số lượng"
              keyboardType="numeric"
            />

            <Text style={styles.formLabel}>Phần trăm giảm giá</Text>
            <TextInput
              style={styles.input}
              value={product1.discount_percent?.toString() || ""}
              onChangeText={(text) =>
                handleChange("discount_percent", parseInt(text) || null)
              }
              placeholder="Phần trăm giảm giá"
              keyboardType="numeric"
            />

            <Text style={styles.formLabel}>Đơn vị</Text>
            <TextInput
              style={styles.input}
              value={product1.unit}
              onChangeText={(text) => handleChange("unit", text)}
              placeholder="Đơn vị"
            />

            <Text style={styles.formLabel}>Thương hiệu</Text>
            <Dropdown
              labelField="brand_name"
              valueField="brand_id"
              data={brands}
              value={product1.br_id}
              onChange={(item) => handleChange("br_id", item.brand_id)}
              style={styles.input}
              placeholder="Chọn thương hiệu"
            />

            <Text style={styles.formLabel}>Loại sản phẩm</Text>
            <Dropdown
              labelField="category_name"
              valueField="category_id"
              data={categories}
              value={product1.c_id}
              onChange={(item) => handleChange("c_id", item.category_id)}
              style={styles.input}
              placeholder="Chọn danh mục"
            />

            <Text style={styles.formLabel}>Mô tả</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={product1.description || ""}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Mô tả"
              multiline
              numberOfLines={4}
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setProduct1((prevProduct1) => ({
                    ...prevProduct1,
                    is_visible: !prevProduct1.is_visible,
                  }))
                }
              >
                <Icon
                  name={product1.is_visible ? "check-square" : "square-o"}
                  size={20}
                  color={product1.is_visible ? "green" : "#ccc"}
                />
                <Text style={styles.checkboxLabel}>Hiển thị</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.checkbox}
                onPress={() =>
                  setProduct1((prevProduct1) => ({
                    ...prevProduct1,
                    is_feature: !prevProduct1.is_feature,
                  }))
                }
              >
                <Icon
                  name={product1.is_feature ? "check-square" : "square-o"}
                  size={20}
                  color={product1.is_feature ? "blue" : "#ccc"}
                />
                <Text style={styles.checkboxLabel}>Nổi bật</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
              <Icon
                name="plus"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Chỉnh sửa sản phẩm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 5,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});
export default AddProductForm;
