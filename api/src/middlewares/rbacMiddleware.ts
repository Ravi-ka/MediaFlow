import { Request, Response, NextFunction } from 'express';

type SubscriptionTier = 'FREE' | 'PREMIUM';

/**
 * RBAC middleware factory.
 *
 * Gates a route to users whose subscriptionTier is in the allowed list.
 * Must be placed AFTER authMiddleware so that req.user is populated.
 *
 * Usage:
 *   router.get('/premium-route', authMiddleware, requireTier('PREMIUM'), handler);
 *   router.get('/shared-route',  authMiddleware, requireTier('FREE', 'PREMIUM'), handler);
 */
export const requireTier = (...allowedTiers: SubscriptionTier[]) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const user = (req as any).user as { subscriptionTier: SubscriptionTier } | undefined;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: no authenticated user found' });
    }

    if (!allowedTiers.includes(user.subscriptionTier)) {
      return res.status(403).json({
        error: 'Forbidden: your subscription tier does not have access to this resource',
        requiredTiers: allowedTiers,
        yourTier: user.subscriptionTier,
      });
    }

    next();
  };
};
