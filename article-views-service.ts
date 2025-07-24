import { db } from "./db";
import { articleViews, type ArticleView, type InsertArticleView } from "@shared/schema";
import { eq } from "drizzle-orm";

export class ArticleViewsService {
  async incrementView(articleId: string): Promise<ArticleView> {
    try {
      // First, try to get existing record
      const [existing] = await db
        .select()
        .from(articleViews)
        .where(eq(articleViews.articleId, articleId));

      if (existing) {
        // Update existing record
        const [updated] = await db
          .update(articleViews)
          .set({
            viewCount: existing.viewCount + 1,
            lastViewed: new Date(),
            updatedAt: new Date()
          })
          .where(eq(articleViews.articleId, articleId))
          .returning();
        return updated;
      } else {
        // Create new record
        const [created] = await db
          .insert(articleViews)
          .values({
            articleId,
            viewCount: 1,
            lastViewed: new Date(),
          })
          .returning();
        return created;
      }
    } catch (error) {
      console.error(`Error incrementing view for article ${articleId}:`, error);
      // Return a default record if database operation fails
      return {
        id: 0,
        articleId,
        viewCount: 1,
        lastViewed: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }

  async getViews(articleId: string): Promise<number> {
    try {
      const [record] = await db
        .select()
        .from(articleViews)
        .where(eq(articleViews.articleId, articleId));
      
      return record?.viewCount || 0;
    } catch (error) {
      console.error(`Error getting views for article ${articleId}:`, error);
      return 0;
    }
  }

  async getAllViews(): Promise<Record<string, number>> {
    try {
      const records = await db.select().from(articleViews);
      return records.reduce((acc, record) => {
        acc[record.articleId] = record.viewCount;
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      console.error("Error getting all article views:", error);
      return {};
    }
  }
}

export const articleViewsService = new ArticleViewsService();