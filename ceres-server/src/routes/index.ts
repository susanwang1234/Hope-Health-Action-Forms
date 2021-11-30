import { Router } from 'express';

import authenticationRoutes from './authenticationRoute';
import departmentRoutes from './departmentRoute';
import departmentFormRoutes from './departmentFormRoute';
import formRoutes from './formRoute';
import formResponsesRoutes from './formResponsesRoute';
import imageRoutes from './imageRoute';
import caseStudyRoutes from './caseStudyRoute';
import caseStudiesRoutes from './caseStudiesRoute';
import caseStudyTypesRoutes from './caseStudyTypesRoute';
import caseStudyQuestionsRoutes from './caseStudyQuestionsRoute';
import caseStudyResponsesRoutes from './caseStudiesResponsesRoute';
import roleRoutes from './roleRoute';
import userRoutes from './userRoute';
import employeeOfTheMonthRoutes from './employeeOfTheMonthRoute';
import emailRoutes from './emailRoute';
import forgotPasswordRoutes from './forgotPasswordRoute';

export const authRouter = Router();
authRouter.use('/auth', authenticationRoutes);

export const apiRouter = Router();

apiRouter.use('/department', departmentRoutes);
apiRouter.use('/department-form', departmentFormRoutes);
apiRouter.use('/role', roleRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/form', formRoutes);
apiRouter.use('/form-responses', formResponsesRoutes);
apiRouter.use('/case-study', caseStudyRoutes);
apiRouter.use('/case-studies', caseStudiesRoutes);
apiRouter.use('/case-study-types', caseStudyTypesRoutes);
apiRouter.use('/case-study-questions', caseStudyQuestionsRoutes);
apiRouter.use('/case-study-responses', caseStudyResponsesRoutes);
apiRouter.use('/image', imageRoutes);
apiRouter.use('/employee-of-the-month', employeeOfTheMonthRoutes);
apiRouter.use('/email', emailRoutes);
apiRouter.use('/forgot-password', forgotPasswordRoutes);
