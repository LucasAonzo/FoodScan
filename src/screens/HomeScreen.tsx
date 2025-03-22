import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAnalyzeMenu } from '../hooks/useAnalyzeMenu';
import { FilterType, MenuAnalysisResult } from '../types';
import { StorageService } from '../services/storage';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { analyzeMenu, results, isLoading, error } = useAnalyzeMenu();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const analysisResults = await analyzeMenu(result.assets[0].uri);
      if (analysisResults) {
        // Save to history
        await StorageService.saveMealToHistory({
          id: Date.now().toString(),
          menuItem: analysisResults[0], // Save the first analyzed item
          date: new Date().toISOString(),
          restaurantName: 'Restaurant Name', // You could add a way to input this
        });
      }
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const analysisResults = await analyzeMenu(result.assets[0].uri);
      if (analysisResults) {
        // Save to history
        await StorageService.saveMealToHistory({
          id: Date.now().toString(),
          menuItem: analysisResults[0], // Save the first analyzed item
          date: new Date().toISOString(),
          restaurantName: 'Restaurant Name', // You could add a way to input this
        });
      }
    }
  };

  const filterResults = (results: MenuAnalysisResult[]) => {
    switch (activeFilter) {
      case 'highProtein':
        return results.filter(item => item.nutritionalInfo.protein >= 20);
      case 'lowCalorie':
        return results.filter(item => item.nutritionalInfo.calories <= 500);
      case 'lowCarb':
        return results.filter(item => item.nutritionalInfo.carbs <= 30);
      case 'vegan':
        return results.filter(item => item.isVegan);
      default:
        return results;
    }
  };

  const filters: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'highProtein', label: 'High Protein' },
    { type: 'lowCalorie', label: 'Low Calorie' },
    { type: 'lowCarb', label: 'Low Carb' },
    { type: 'vegan', label: 'Vegan' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>FoodScan</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Ionicons name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Ionicons name="image" size={24} color="white" />
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
        </View>

        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        )}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5142C4" />
            <Text style={styles.loadingText}>Analyzing menu...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {results.length > 0 && (
          <>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersContainer}
            >
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.type}
                  style={[
                    styles.filterButton,
                    activeFilter === filter.type && styles.activeFilterButton,
                  ]}
                  onPress={() => setActiveFilter(filter.type)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === filter.type && styles.activeFilterText,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.resultsContainer}>
              {filterResults(results).map((item, index) => (
                <MenuItemCard key={index} item={item} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#5142C4',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5142C4',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E5E5',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#5142C4',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  resultsContainer: {
    gap: 16,
  },
});