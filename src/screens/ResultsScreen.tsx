import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAnalyzeMenu } from '../hooks/useAnalyzeMenu';
import { MenuItemCard } from '../components/MenuItemCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type FilterType = 'all' | 'highProtein' | 'lowCalorie' | 'lowCarb';

export default function ResultsScreen() {
  const { results, isLoading, error } = useAnalyzeMenu();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredResults = React.useMemo(() => {
    if (!results) return [];
    
    switch (activeFilter) {
      case 'highProtein':
        return results.filter(item => 
          item.nutritionalInfo && 
          Number(item.nutritionalInfo.protein) > 20
        );
      case 'lowCalorie':
        return results.filter(item => 
          item.nutritionalInfo && 
          Number(item.nutritionalInfo.calories) < 500
        );
      case 'lowCarb':
        return results.filter(item => 
          item.nutritionalInfo && 
          Number(item.nutritionalInfo.carbs) < 20
        );
      default:
        return results;
    }
  }, [results, activeFilter]);

  const handleBack = () => {
    router.back();
  };

  const FilterButton = ({ type, label }: { type: FilterType, label: string }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === type ? styles.activeFilterButton : null
      ]}
      onPress={() => setActiveFilter(type)}
    >
      <Text 
        style={[
          styles.filterButtonText, 
          activeFilter === type ? styles.activeFilterButtonText : null
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5142C4" />
        <Text style={styles.loadingText}>Processing menu items...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Menu Analysis</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
          <FilterButton type="all" label="All Items" />
          <FilterButton type="highProtein" label="High Protein" />
          <FilterButton type="lowCalorie" label="Low Calorie" />
          <FilterButton type="lowCarb" label="Low Carb" />
        </ScrollView>
      </View>

      {filteredResults.length > 0 ? (
        <FlatList
          data={filteredResults}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          keyExtractor={(item, index) => `${item.dishName}-${index}`}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={60} color="#CCCCCC" />
          <Text style={styles.emptyText}>No menu items found</Text>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back to Scanner</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filtersScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#5142C4',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666666',
  },
  activeFilterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#5142C4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});