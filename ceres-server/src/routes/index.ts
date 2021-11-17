import { Router } from 'express';
import passport from 'passport';

import authenticationRoutes from './authenticationRoute';
import departmentRoutes from './departmentRoute';
import departmentFormRoutes from './departmentFormRoute';
import formRoutes from './formRoute';
import formResponsesRoutes from './formResponsesRoute';
import caseStudiesRoutes from './caseStudiesRoute';
import caseStudyTypesRoutes from './caseStudyTypesRoute';
import caseStudyQuestionsRoutes from './caseStudyQuestionsRoute';
import caseStudyResponsesRoutes from './caseStudiesResponsesRoute';
import roleRoutes from './roleRoute';
import userRoutes from './userRoute';
import routes from './indexRoute';

export const authRouter = Router();
authRouter.use('/auth', authenticationRoutes);

export const apiRouter = Router();
// authentication middleware on all api endpoints
// apiRouter.use(passport.authenticate('authAll', { session: false }));

apiRouter.use('', routes);
apiRouter.use('/department', departmentRoutes);
apiRouter.use('/department-form', departmentFormRoutes);
apiRouter.use('/role', roleRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/form', formRoutes);
apiRouter.use('/form-responses', formResponsesRoutes);
apiRouter.use('/case-studies', caseStudiesRoutes);
apiRouter.use('/case-study-types', caseStudyTypesRoutes);
apiRouter.use('/case-study-questions', caseStudyQuestionsRoutes);
apiRouter.use('/case-study-responses', caseStudyResponsesRoutes);
