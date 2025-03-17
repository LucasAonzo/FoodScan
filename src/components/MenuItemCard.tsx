import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuAnalysisResult } from '../types';

interface MenuItemCardProps {
  item: MenuAnalysisResult;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.dishName}</Text>
      
      <Text style={styles.description}>{item.description}</Text>
      
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>
            {item.nutritionalInfo.calories}
          </Text>
          <Text style={styles.nutritionLabel}>Calories</Text>
        </View>
        
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>
            {item.nutritionalInfo.protein}g
          </Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>
            {item.nutritionalInfo.carbs}g
          </Text>
          <Text style={styles.nutritionLabel}>Carbs</Text>
        </View>
        
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>
            {item.nutritionalInfo.fat}g
          </Text>
          <Text style={styles.nutritionLabel}>Fat</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    lineHeight: 20,
  },
  nutritionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5142C4',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
});